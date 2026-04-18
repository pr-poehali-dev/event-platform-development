import { useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Chat, Message } from './types';

/* ─── Пузырёк сообщения ─── */
interface BubbleProps {
  msg: Message;
  allMessages: Message[];
  onContextMenu: (e: React.MouseEvent, msg: Message) => void;
}
const Bubble = ({ msg, allMessages, onContextMenu }: BubbleProps) => {
  const isMe = msg.from === 'me';
  const replyMsg = msg.replyTo ? allMessages.find(m => m.id === msg.replyTo) : null;

  return (
    <div className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isMe && (
        <Avatar className="w-7 h-7 shrink-0 mb-1">
          <AvatarFallback className="text-xs">М</AvatarFallback>
        </Avatar>
      )}
      <div className={`max-w-[72%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
        {/* Цитата */}
        {replyMsg && (
          <div className={`mb-1 px-3 py-1.5 rounded-xl border-l-4 bg-muted/60 text-xs text-muted-foreground max-w-full truncate ${isMe ? 'border-primary' : 'border-secondary'}`}>
            {replyMsg.from === 'me' ? 'Вы' : 'Собеседник'}: {replyMsg.text}
          </div>
        )}
        {/* Пузырь */}
        <div
          onContextMenu={e => { e.preventDefault(); onContextMenu(e, msg); }}
          className={`relative px-4 py-2.5 rounded-2xl cursor-pointer select-text group ${
            isMe
              ? 'gradient-purple text-white rounded-br-sm'
              : 'bg-white border shadow-sm text-foreground rounded-bl-sm'
          } ${msg.forwarded ? 'opacity-90' : ''}`}
        >
          {msg.forwarded && (
            <p className={`text-[10px] mb-1 flex items-center gap-1 ${isMe ? 'text-white/70' : 'text-muted-foreground'}`}>
              <Icon name="Forward" size={10} /> Пересланное сообщение
            </p>
          )}
          <p className="text-sm leading-relaxed">{msg.text}</p>
          {msg.editCount > 0 && (
            <span className={`text-[10px] ${isMe ? 'text-white/60' : 'text-muted-foreground'}`}>(изм.)</span>
          )}
        </div>
        {/* Реакции */}
        {msg.reactions.length > 0 && (
          <div className="flex gap-0.5 mt-1 flex-wrap">
            {Object.entries(msg.reactions.reduce((acc, r) => { acc[r.emoji] = (acc[r.emoji] || 0) + 1; return acc; }, {} as Record<string, number>))
              .map(([emoji, count]) => (
                <span key={emoji} className="text-sm bg-white border rounded-full px-1.5 py-0.5 shadow-sm">{emoji}{count > 1 && <span className="text-xs ml-0.5 text-muted-foreground">{count}</span>}</span>
              ))}
          </div>
        )}
        {/* Время + статус */}
        <div className={`flex items-center gap-1 mt-0.5 ${isMe ? 'flex-row-reverse' : ''}`}>
          <span className="text-[11px] text-muted-foreground">{msg.time}</span>
          {isMe && (
            <Icon name={msg.read ? 'CheckCheck' : 'Check'} size={13} className={msg.read ? 'text-primary' : 'text-muted-foreground'} />
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Окно чата ─── */
interface ChatWindowProps {
  active: Chat;
  input: string;
  replyTo: Message | null;
  editingMsg: Message | null;
  onInputChange: (v: string) => void;
  onSend: () => void;
  onCancelReplyEdit: () => void;
  onContextMenu: (e: React.MouseEvent, msg: Message) => void;
  onReport: (c: Chat) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}
const ChatWindow = ({
  active, input, replyTo, editingMsg,
  onInputChange, onSend, onCancelReplyEdit,
  onContextMenu, onReport, messagesEndRef,
}: ChatWindowProps) => (
  <div className="flex-1 flex flex-col min-w-0">
    {/* Шапка чата */}
    <div className="flex items-center gap-3 px-5 py-3 border-b bg-background">
      <Avatar className="w-10 h-10">
        <AvatarImage src={active.avatar} />
        <AvatarFallback>{active.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{active.name}</p>
        <div className="flex items-center gap-1.5">
          {active.status === 'online'
            ? <><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /><span className="text-xs text-green-600">Онлайн</span></>
            : <span className="text-xs text-muted-foreground">Был(а) {active.lastSeen}</span>}
        </div>
      </div>
      <button onClick={() => onReport(active)} className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors" title="Пожаловаться">
        <Icon name="Flag" size={17} />
      </button>
    </div>

    {/* Сообщения */}
    <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-muted/20">
      {active.messages.map(msg => (
        <Bubble
          key={msg.id}
          msg={msg}
          allMessages={active.messages}
          onContextMenu={onContextMenu}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* Цитата / редактирование */}
    {(replyTo || editingMsg) && (
      <div className="flex items-center gap-3 px-4 py-2 border-t bg-primary/5">
        <Icon name={editingMsg ? 'Pencil' : 'Reply'} size={15} className="text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-primary">{editingMsg ? 'Редактирование' : 'Ответ'}</p>
          <p className="text-xs text-muted-foreground truncate">{editingMsg?.text ?? replyTo?.text}</p>
        </div>
        <button onClick={onCancelReplyEdit}>
          <Icon name="X" size={16} className="text-muted-foreground" />
        </button>
      </div>
    )}

    {/* Поле ввода */}
    <div className="px-4 py-3 border-t flex items-center gap-2 bg-background">
      <Input
        className="flex-1 rounded-full"
        placeholder="Написать сообщение..."
        value={input}
        onChange={e => onInputChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), onSend())}
      />
      <Button
        size="icon"
        className="gradient-purple text-white rounded-full shrink-0"
        onClick={onSend}
        disabled={!input.trim()}
      >
        <Icon name="Send" size={16} />
      </Button>
    </div>
  </div>
);

export default ChatWindow;
