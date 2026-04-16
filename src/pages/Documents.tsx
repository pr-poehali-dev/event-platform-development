import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

/* ─── Данные документов ─── */
interface Document {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  icon: string;
  gradient: string;
  illustration: React.ReactNode;
}

const DOCS: Document[] = [
  {
    id: 'rules',
    title: 'Правила платформы',
    subtitle: 'Общие правила использования сервиса Эвента',
    updatedAt: '1 апреля 2026',
    icon: 'ShieldCheck',
    gradient: 'from-violet-500 to-purple-600',
    illustration: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="20" y="10" width="40" height="52" rx="5" fill="white" fillOpacity=".15"/>
        <rect x="26" y="20" width="28" height="3" rx="1.5" fill="white" fillOpacity=".6"/>
        <rect x="26" y="27" width="20" height="3" rx="1.5" fill="white" fillOpacity=".4"/>
        <rect x="26" y="34" width="24" height="3" rx="1.5" fill="white" fillOpacity=".4"/>
        <rect x="26" y="41" width="16" height="3" rx="1.5" fill="white" fillOpacity=".3"/>
        <circle cx="57" cy="57" r="14" fill="white" fillOpacity=".2"/>
        <path d="M51 57l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'privacy',
    title: 'Политика конфиденциальности',
    subtitle: 'Как мы собираем, храним и защищаем ваши данные',
    updatedAt: '1 апреля 2026',
    icon: 'Lock',
    gradient: 'from-blue-500 to-cyan-500',
    illustration: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="22" y="34" width="36" height="28" rx="5" fill="white" fillOpacity=".15"/>
        <path d="M30 34v-8a10 10 0 0120 0v8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="40" cy="47" r="4" fill="white" fillOpacity=".7"/>
        <rect x="38.5" y="50" width="3" height="5" rx="1.5" fill="white" fillOpacity=".7"/>
      </svg>
    ),
  },
  {
    id: 'terms',
    title: 'Пользовательское соглашение',
    subtitle: 'Условия использования платформы и права пользователей',
    updatedAt: '1 апреля 2026',
    icon: 'FileText',
    gradient: 'from-emerald-500 to-teal-500',
    illustration: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <rect x="18" y="12" width="36" height="48" rx="5" fill="white" fillOpacity=".15"/>
        <rect x="24" y="22" width="24" height="2.5" rx="1.25" fill="white" fillOpacity=".6"/>
        <rect x="24" y="29" width="18" height="2.5" rx="1.25" fill="white" fillOpacity=".4"/>
        <rect x="24" y="36" width="22" height="2.5" rx="1.25" fill="white" fillOpacity=".4"/>
        <rect x="24" y="43" width="14" height="2.5" rx="1.25" fill="white" fillOpacity=".3"/>
        <path d="M46 52l6-6 6 6" stroke="white" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round"/>
        <path d="M52 46v12" stroke="white" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'oferta',
    title: 'Публичная оферта',
    subtitle: 'Договор на оказание услуг платформы Эвента',
    updatedAt: '1 апреля 2026',
    icon: 'Handshake',
    gradient: 'from-orange-500 to-rose-500',
    illustration: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <path d="M22 44c0-2 2-3 4-2l8 4 4-8c1-2 4-2 5 0l3 6 6-10c1-2 4-1 4 1v14c0 3-2 5-5 5H27c-3 0-5-2-5-5v-5z" fill="white" fillOpacity=".15"/>
        <path d="M28 36l10 6 6-12" stroke="white" strokeOpacity=".7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="52" cy="26" r="10" fill="white" fillOpacity=".15"/>
        <path d="M48 26l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const DOC_CONTENT = `Текст документа будет добавлен позднее.`;

const DocCard = ({ doc }: { doc: Document }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${open ? 'shadow-lg' : 'hover:shadow-md hover:-translate-y-0.5'}`}>
      {/* Шапка-плашка */}
      <button
        className="w-full text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className={`bg-gradient-to-br ${doc.gradient} p-5 flex items-center gap-4`}>
          {/* Иллюстрация */}
          <div className="w-16 h-16 shrink-0">
            {doc.illustration}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base leading-tight">{doc.title}</h3>
            <p className="text-white/70 text-xs mt-0.5 leading-snug">{doc.subtitle}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Icon
              name={open ? 'ChevronUp' : 'ChevronDown'}
              size={20}
              className="text-white/80"
            />
          </div>
        </div>

        {/* Дата под шапкой */}
        <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Icon name="CalendarDays" size={12} />
            Последнее изменение: <span className="font-medium text-foreground">{doc.updatedAt}</span>
          </span>
          <span className={`flex items-center gap-1 text-xs font-medium ${open ? 'text-primary' : 'text-muted-foreground'}`}>
            <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={12} />
            {open ? 'Свернуть' : 'Читать'}
          </span>
        </div>
      </button>

      {/* Разворачиваемый текст */}
      {open && (
        <div className="animate-fade-in">
          {/* Кнопка скачать */}
          <div className={`px-5 py-4 bg-gradient-to-r ${doc.gradient} bg-opacity-5 border-b flex items-center justify-between gap-3`}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${doc.gradient} flex items-center justify-center`}>
                <Icon name={doc.icon} size={15} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Документ доступен для скачивания</p>
                <p className="text-sm font-medium">{doc.title}</p>
              </div>
            </div>
            <Button
              size="sm"
              className={`bg-gradient-to-r ${doc.gradient} text-white border-0 hover:opacity-90 shrink-0`}
              onClick={e => e.stopPropagation()}
            >
              <Icon name="Download" size={14} className="mr-1.5" />
              Скачать PDF
            </Button>
          </div>

          {/* Текст документа */}
          <div className="px-5 py-5">
            <p className="text-sm text-muted-foreground italic">{DOC_CONTENT}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Documents = () => (
  <DashboardLayout>
    <div className="max-w-3xl animate-fade-in space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-1">Документы</h2>
        <p className="text-muted-foreground">Юридические документы платформы Эвента</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DOCS.map(doc => <DocCard key={doc.id} doc={doc} />)}
      </div>

      <p className="text-xs text-muted-foreground text-center pt-2">
        По вопросам, связанным с документами, обращайтесь в{' '}
        <a href="/dashboard/support" className="text-primary underline">службу поддержки</a>
      </p>
    </div>
  </DashboardLayout>
);

export default Documents;
