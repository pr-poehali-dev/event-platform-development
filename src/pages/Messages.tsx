import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChatSidebar from '@/components/messages/ChatSidebar';
import ChatWindow from '@/components/messages/ChatWindow';
import { ContextMenu, ReportModal, HistoryModal, ForwardModal } from '@/components/messages/MessageModals';
import { INIT_CHATS, timeNow } from '@/components/messages/types';
import type { Chat, Message } from '@/components/messages/types';

const Messages = () => {
  const [chats, setChats] = useState<Chat[]>(INIT_CHATS);
  const [activeId, setActiveId] = useState<string | null>('1');
  const [input, setInput] = useState('');
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [editingMsg, setEditingMsg] = useState<Message | null>(null);
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number; msg: Message } | null>(null);
  const [historyMsg, setHistoryMsg] = useState<Message | null>(null);
  const [forwardMsg, setForwardMsg] = useState<Message | null>(null);
  const [reportChat, setReportChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const active = chats.find(c => c.id === activeId) ?? null;

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeId, active?.messages.length]);

  /* Выбор чата — сбрасываем непрочитанные */
  const openChat = (id: string) => {
    setActiveId(id);
    setChats(prev => prev.map(c => c.id === id ? { ...c, unread: 0, messages: c.messages.map(m => ({ ...m, read: true })) } : c));
  };

  /* Закрепить / открепить */
  const togglePin = (id: string) => {
    const pins = chats.filter(c => c.pinned && c.id !== id).length;
    setChats(prev => prev.map(c => {
      if (c.id !== id) return c;
      if (!c.pinned && pins >= 3) return c;
      return { ...c, pinned: !c.pinned };
    }));
  };

  /* Отправить / сохранить */
  const send = () => {
    if (!input.trim() || !active) return;

    if (editingMsg) {
      setChats(prev => prev.map(c => c.id === activeId ? {
        ...c, messages: c.messages.map(m => m.id === editingMsg.id ? {
          ...m,
          text: input,
          editCount: m.editCount + 1,
          versions: [...m.versions, { text: m.text, at: timeNow() }],
        } : m),
      } : c));
      setEditingMsg(null);
    } else {
      const msg: Message = {
        id: Date.now(), from: 'me', text: input, time: timeNow(),
        read: false, reactions: [], versions: [], editCount: 0,
        replyTo: replyTo?.id,
      };
      setChats(prev => prev.map(c => c.id === activeId ? { ...c, messages: [...c.messages, msg] } : c));
      setReplyTo(null);
    }
    setInput('');
  };

  /* Реакция */
  const addReaction = (msgId: number, emoji: string) => {
    setChats(prev => prev.map(c => c.id !== activeId ? c : {
      ...c, messages: c.messages.map(m => {
        if (m.id !== msgId) return m;
        const exists = m.reactions.find(r => r.emoji === emoji && r.from === 'me');
        return {
          ...m, reactions: exists
            ? m.reactions.filter(r => !(r.emoji === emoji && r.from === 'me'))
            : [...m.reactions, { emoji, from: 'me' }],
        };
      }),
    }));
  };

  /* Переслать */
  const forwardTo = (targetId: string, msg: Message) => {
    const fwd: Message = { ...msg, id: Date.now(), from: 'me', forwarded: true, replyTo: undefined, time: timeNow(), read: false };
    setChats(prev => prev.map(c => c.id === targetId ? { ...c, messages: [...c.messages, fwd] } : c));
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in h-[calc(100vh-5rem)] flex gap-0 rounded-2xl border overflow-hidden bg-background">

        <ChatSidebar
          chats={chats}
          activeId={activeId}
          onOpen={openChat}
          onPin={togglePin}
          onReport={setReportChat}
        />

        {active ? (
          <ChatWindow
            active={active}
            input={input}
            replyTo={replyTo}
            editingMsg={editingMsg}
            onInputChange={setInput}
            onSend={send}
            onCancelReplyEdit={() => { setReplyTo(null); setEditingMsg(null); setInput(''); }}
            onContextMenu={(e, m) => setCtxMenu({ x: e.clientX, y: e.clientY, msg: m })}
            onReport={setReportChat}
            messagesEndRef={messagesEndRef}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Выберите чат
          </div>
        )}
      </div>

      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x} y={ctxMenu.y} msg={ctxMenu.msg}
          onClose={() => setCtxMenu(null)}
          onReact={emoji => addReaction(ctxMenu.msg.id, emoji)}
          onEdit={() => { setEditingMsg(ctxMenu.msg); setInput(ctxMenu.msg.text); }}
          onReply={() => setReplyTo(ctxMenu.msg)}
          onForward={() => setForwardMsg(ctxMenu.msg)}
          onHistory={() => setHistoryMsg(ctxMenu.msg)}
          onReport={() => setReportChat(active)}
        />
      )}

      {historyMsg && <HistoryModal versions={historyMsg.versions} onClose={() => setHistoryMsg(null)} />}
      {forwardMsg && active && (
        <ForwardModal chats={chats} msg={forwardMsg}
          onForward={id => forwardTo(id, forwardMsg)}
          onClose={() => setForwardMsg(null)} />
      )}
      {reportChat && <ReportModal name={reportChat.name} onClose={() => setReportChat(null)} />}
    </DashboardLayout>
  );
};

export default Messages;
