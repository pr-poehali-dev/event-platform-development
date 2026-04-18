import { useRef, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { REACTIONS } from './types';
import type { Chat, Message, MsgVersion } from './types';

/* ─── Контекстное меню ─── */
interface CtxMenuProps {
  x: number; y: number;
  msg: Message;
  onClose: () => void;
  onReact: (emoji: string) => void;
  onEdit: () => void;
  onReply: () => void;
  onForward: () => void;
  onHistory: () => void;
  onReport: () => void;
}
export const ContextMenu = ({ x, y, msg, onClose, onReact, onEdit, onReply, onForward, onHistory, onReport }: CtxMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const left = Math.min(x, window.innerWidth - 220);
  const top  = Math.min(y, window.innerHeight - 320);

  return (
    <div ref={ref} className="fixed z-[200] bg-background border rounded-2xl shadow-2xl w-52 overflow-hidden" style={{ left, top }}>
      <div className="flex items-center justify-around px-3 py-2.5 border-b">
        {REACTIONS.map(e => (
          <button key={e} onClick={() => { onReact(e); onClose(); }}
            className="text-xl hover:scale-125 transition-transform">{e}</button>
        ))}
      </div>
      {[
        { icon: 'Reply',   label: 'Ответить',    fn: onReply },
        { icon: 'Forward', label: 'Переслать',    fn: onForward },
        ...(msg.from === 'me' && msg.editCount < 3
          ? [{ icon: 'Pencil', label: `Изменить (${3 - msg.editCount} осталось)`, fn: onEdit }]
          : []),
        ...(msg.versions.length > 0
          ? [{ icon: 'History', label: 'История правок', fn: onHistory }]
          : []),
        { icon: 'Flag',    label: 'Пожаловаться', fn: onReport },
      ].map(item => (
        <button key={item.label} onClick={() => { item.fn(); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left">
          <Icon name={item.icon} size={15} className="text-muted-foreground" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

/* ─── Модалка жалобы ─── */
export const ReportModal = ({ name, onClose }: { name: string; onClose: () => void }) => {
  const reasons = ['Спам', 'Оскорбления', 'Мошенничество', 'Неуместный контент', 'Другое'];
  const [selected, setSelected] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
        {sent ? (
          <div className="text-center space-y-3">
            <Icon name="CheckCircle" size={40} className="text-green-500 mx-auto" />
            <p className="font-semibold">Жалоба отправлена</p>
            <p className="text-sm text-muted-foreground">Мы рассмотрим её в течение 48 часов.</p>
            <Button className="w-full" onClick={onClose}>Закрыть</Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Пожаловаться на {name}</h3>
              <button onClick={onClose}><Icon name="X" size={18} className="text-muted-foreground" /></button>
            </div>
            <div className="space-y-2">
              {reasons.map(r => (
                <button key={r} onClick={() => setSelected(r)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${selected === r ? 'border-primary bg-primary/5 font-medium' : 'border-border hover:border-primary/40'}`}>
                  {r}
                </button>
              ))}
            </div>
            <Button className="w-full gradient-purple text-white" disabled={!selected} onClick={() => setSent(true)}>
              Отправить жалобу
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

/* ─── Модалка истории правок ─── */
export const HistoryModal = ({ versions, onClose }: { versions: MsgVersion[]; onClose: () => void }) => (
  <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div className="bg-background rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">История правок</h3>
        <button onClick={onClose}><Icon name="X" size={18} className="text-muted-foreground" /></button>
      </div>
      <div className="space-y-3">
        {versions.map((v, i) => (
          <div key={i} className="rounded-xl bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground mb-1">Версия {i + 1} · {v.at}</p>
            <p className="text-sm">{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Модалка пересылки ─── */
export const ForwardModal = ({ chats, msg, onForward, onClose }: { chats: Chat[]; msg: Message; onForward: (chatId: string) => void; onClose: () => void }) => (
  <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div className="bg-background rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Переслать сообщение</h3>
        <button onClick={onClose}><Icon name="X" size={18} className="text-muted-foreground" /></button>
      </div>
      <div className="bg-muted/40 rounded-xl p-3 text-sm text-muted-foreground line-clamp-2">{msg.text}</div>
      <div className="space-y-1 max-h-60 overflow-y-auto">
        {chats.map(c => (
          <button key={c.id} onClick={() => { onForward(c.id); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors text-left">
            <Avatar className="w-9 h-9"><AvatarImage src={c.avatar} /><AvatarFallback>{c.name[0]}</AvatarFallback></Avatar>
            <span className="text-sm font-medium">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);
