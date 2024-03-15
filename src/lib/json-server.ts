const BASE_URL = 'http://localhost:3014'

async function fetchData(url: string, options = {}): Promise<any> {
  try {
    // if (Math.random() < 0.1) {
    //   throw new Error('Fake server error')
    // }

    // Opt out of nextjs caching, otherwise server data is always stale
    const response = await fetch(url, { ...options, cache: 'no-store' })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

async function list<T>(endpoint: string): Promise<T[]> {
  return fetchData(`${BASE_URL}/${endpoint}`)
}

async function get<T>(endpoint: string, id: string): Promise<T> {
  return fetchData(`${BASE_URL}/${endpoint}/${id}`)
}

async function post<T>(endpoint: string, data: T): Promise<T> {
  return fetchData(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

async function patch<T>(
  endpoint: string,
  data: Partial<T> & { id: string },
): Promise<T> {
  return fetchData(`${BASE_URL}/${endpoint}/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

async function remove<T>(endpoint: string, id: string): Promise<T> {
  return fetchData(`${BASE_URL}/${endpoint}/${id}`, {
    method: 'DELETE',
  })
}

export { list, get, post, patch, remove }
