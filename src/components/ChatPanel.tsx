'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { Icons } from '@/components/Icons'
import { contact } from '@/content/site'

// Chat panel. This is a guided helper, not live chat: replies are canned and
// nothing typed here is sent anywhere. Connect a chat service (see README.md ›
// Chat) before promising real-time replies.

const chatQuickActions = [
  'Book an appointment',
  'Find the right service',
  'NDIS support',
  'SIL / SDA accommodation',
  'Refer a client',
  'Talk to our team',
]

const MAX_MESSAGE_LENGTH = 500

type Message = { id: number; from: 'bot' | 'user'; text: string }

export default function ChatPanel({
  open, onClose, onBook, onReferral,
}: { open: boolean; onClose: () => void; onBook: () => void; onReferral: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: 'bot', text: 'Hi! 👋 How can we help today?' }])
  const [input, setInput] = useState('')
  const nextId = useRef(1)
  const timers = useRef<number[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }, [])
  const add = useCallback((from: Message['from'], text: string) => {
    const id = nextId.current++
    setMessages(prev => [...prev, { id, from, text }])
  }, [])

  // Clear pending replies if the panel unmounts.
  useEffect(() => () => timers.current.forEach(t => window.clearTimeout(t)), [])

  // Focus the message box on open; Esc closes.
  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => { cancelAnimationFrame(frame); document.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  // Keep the latest message in view.
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const handleQuick = useCallback((action: string) => {
    add('user', action)
    later(() => {
      if (action === 'Book an appointment') {
        add('bot', "Great! I'll open our booking form for you right now.")
        later(onBook, 600)
      } else if (action === 'Refer a client') {
        add('bot', "Of course. I'll take you to our referral information now.")
        later(onReferral, 600)
      } else {
        add('bot', `Thanks for your interest in "${action}". Call us on ${contact.phone} or book an appointment and our team will help you.`)
      }
    }, 600)
  }, [add, later, onBook, onReferral])

  const handleSend = (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    add('user', text)
    setInput('')
    later(() => add('bot', `Thanks for your message. To reach our team, call ${contact.phone} or use the booking form. For emergencies, call 000.`), 800)
  }

  return (
    <div
      id="chat-panel"
      role="dialog"
      aria-label="Chat with CHC"
      // inert removes the closed panel from the tab order and the accessibility tree.
      inert={!open}
      className={`fixed bottom-24 right-5 z-[150] w-[calc(100vw-2.5rem)] max-w-80 md:max-w-96 rounded-2xl overflow-hidden shadow-2xl bg-white transition-all duration-300 ${
        open ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
      style={{ maxHeight: '560px' }}
    >
      <div className="bg-[#27156F] text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div aria-hidden="true" className="w-9 h-9 rounded-full bg-[#FF9D00] flex items-center justify-center text-lg">💬</div>
          <div>
            <p className="font-semibold text-sm">Chat with CHC</p>
            <p className="text-white/60 text-xs">Quick help and next steps</p>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close chat" className="text-white/60 hover:text-white transition-colors"><Icons.X /></button>
      </div>

      <div ref={listRef} role="log" aria-live="polite" className="flex flex-col gap-3 p-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed break-words ${
                m.from === 'user' ? 'bg-[#27156F] text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <div className="flex flex-col gap-1.5 mt-1">
            {chatQuickActions.map(action => (
              <button
                key={action}
                type="button"
                onClick={() => handleQuick(action)}
                className="text-left text-sm text-[#27156F] font-medium bg-[#27156F]/6 hover:bg-[#27156F]/12 rounded-xl px-4 py-2.5 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="border-t border-gray-100 p-3 flex gap-2">
        <input
          ref={inputRef}
          aria-label="Type a message"
          className="flex-1 min-w-0 text-sm px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#27156F] placeholder-gray-400"
          placeholder="Type a message…"
          value={input}
          maxLength={MAX_MESSAGE_LENGTH}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#27156F] hover:bg-[#3820A0] text-white rounded-xl transition-colors"
          aria-label="Send message"
        >
          <Icons.Send />
        </button>
      </form>
    </div>
  )
}
