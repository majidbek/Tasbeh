// handlers/pre_checkout_query.js — to'lovdan oldin Telegram so'raydi: tasdiqlash
// 10 soniya ichida bo'lishi shart, aks holda to'lov bekor bo'ladi.

import { api } from 'sdk';

export default async function (query) {
  const ok = query.currency === 'XTR' && String(query.invoice_payload).startsWith('donate:');
  await api.answerPreCheckoutQuery(
    ok
      ? { pre_checkout_query_id: query.id, ok: true }
      : { pre_checkout_query_id: query.id, ok: false, error_message: 'To‘lovni qabul qilib bo‘lmadi, qayta urinib ko‘ring.' }
  );
}
