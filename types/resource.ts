export interface Risorsa {
  id: string;
  title: string;
  url: string;
  type: 'Video' | 'PDF';
  subject: 'Fisica' | 'Matematica' | 'Metodo di Studio';
  description?: string;
}
