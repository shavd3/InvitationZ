import { icsContent } from '@/lib/constants';

export async function GET() {
  return new Response(icsContent(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="amaya-shavin-wedding.ics"',
    },
  });
}
