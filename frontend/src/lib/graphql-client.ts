const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

export async function executeGraphQL<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('foodrescue_token') : null;

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Server returned error ${res.status}: ${errorText}`);
  }

  const json = await res.json();
  if (json.errors && json.errors.length > 0) {
    const message = json.errors[0]?.message || 'GraphQL operation failed';
    
    // Auto-clear invalid/stale session tokens (e.g., after switching databases)
    if (
      typeof window !== 'undefined' &&
      (message.includes('User not found or session invalid') ||
        message.includes('Unauthorized') ||
        message.toLowerCase().includes('jwt expired'))
    ) {
      localStorage.removeItem('foodrescue_token');
      localStorage.removeItem('foodrescue_user');
      if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/signup')) {
        window.location.href = '/login?session=expired';
      }
    }

    throw new Error(message);
  }

  return json.data as T;
}
