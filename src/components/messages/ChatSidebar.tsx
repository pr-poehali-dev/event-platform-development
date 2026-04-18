import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { lastMsg } from './types';
import type { Chat } from './types';

/* ─── Строка чата ─── */
interface ChatRowProps { chat: Chat; active: boolean; onOpen: (id: string) => void; onPin: (id: string) => void; onReport: (c: Chat) => void }
const ChatRow = ({ chat, active, onOpen, onPin, onReport }: ChatRowProps) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`flex items-center gap-3 px-2 py-2.5 rounded-xl cursor-pointer transition-colors relative group ${active ? 'bg-primary/8 border border-primary/15' : 'hover:bg-muted/60'}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(chat.id)}
    >
      <div className="relative shrink-0">
        <Avatar className="w-10 h-10">
          <AvatarImage src={chat.avatar} />
          <AvatarFallback>{chat.name[0]}</AvatarFallback>
        </Avatar>
        {chat.status === 'online' && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold truncate">{chat.name}</span>
          <span className="text-[11px] text-muted-foreground shrink-0 ml-1">
            {chat.messages[chat.messages.length - 1]?.time ?? ''}
          </span>
        </div>
        <p className={`text-xs truncate ${chat.unread > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
          {lastMsg(chat)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        {chat.unread > 0 && (
          <Badge className="gradient-purple text-white border-0 text-[10px] px-1.5 py-0 min-w-[18px] h-[18px] flex items-center justify-center">
            {chat.unread}
          </Badge>
        )}
        {chat.pinned && <Icon name="Pin" size={12} className="text-primary" />}
      </div>
      {hover && (
        <div className="absolute right-2 top-2 flex gap-0.5 bg-background rounded-lg border shadow-sm">
          <button
            onClick={e => { e.stopPropagation(); onPin(chat.id); }}
            className="p-1.5 hover:bg-muted rounded-md transition-colors"
            title={chat.pinned ? 'Открепить' : 'Закрепить'}
          >
            <Icon name={chat.pinned ? 'PinOff' : 'Pin'} size={13} className="text-muted-foreground" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onReport(chat); }}
            className="p-1.5 hover:bg-muted rounded-md transition-colors"
            title="Пожаловаться"
          >
            <Icon name="Flag" size={13} className="text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};

/* ─── Боковая панель чатов ─── */
interface ChatSidebarProps {
  chats: Chat[];
  activeId: string | null;
  onOpen: (id: string) => void;
  onPin: (id: string) => void;
  onReport: (c: Chat) => void;
}
const ChatSidebar = ({ chats, activeId, onOpen, onPin, onReport }: ChatSidebarProps) => {
  const [search, setSearch] = useState('');

  const totalUnread = chats.reduce((s, c) => s + c.unread, 0);
  const pinnedChats = chats.filter(c => c.pinned);
  const filtered = chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-72 shrink-0 flex flex-col border-r">
      {/* Шапка */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-lg">Чаты</h2>
            {totalUnread > 0 && (
              <Badge className="gradient-purple text-white border-0 text-xs px-2">{totalUnread}</Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{chats.length} чатов</span>
        </div>
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Поиск..." className="pl-9 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Закреплённые */}
      {!search && pinnedChats.length > 0 && (
        <div className="px-3 pt-3">
          <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-2 px-1">Закреплённые</p>
          {pinnedChats.map(c => (
            <ChatRow key={c.id} chat={c} active={activeId === c.id} onOpen={onOpen} onPin={onPin} onReport={onReport} />
          ))}
          <div className="h-px bg-border my-2" />
        </div>
      )}

      {/* Все чаты */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {filtered.filter(c => !c.pinned || !!search).map(c => (
          <ChatRow key={c.id} chat={c} active={activeId === c.id} onOpen={onOpen} onPin={onPin} onReport={onReport} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">Чаты не найдены</div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
