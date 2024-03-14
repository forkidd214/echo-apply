import db from '@/data/db.json'

const BASE_URL = 'http://localhost:3014'

async function fetchData(url: string, options = {}): Promise<any> {
  try {
    // if (Math.random() < 0.1) {
    //   throw new Error('Fake server error')
    // }

    const response = await fetch(url, options)
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
  data: T & { id: string },
): Promise<T> {
  return fetchData(`${BASE_URL}/${endpoint}/${data.id}`, {
    method: 'PUT',
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

/**
 * blocks apis
 *
 */
const BLOCK_ENDPOINT = 'blocks'
type BlockType = (typeof db)[typeof BLOCK_ENDPOINT][0]

const listBlocks = async () => list<BlockType>(BLOCK_ENDPOINT)

const readBlock = async (id: string) => get<BlockType>(BLOCK_ENDPOINT, id)

const createBlock = async (block: BlockType) =>
  post<BlockType>(BLOCK_ENDPOINT, block)

const updateBlock = async (block: BlockType) =>
  patch<BlockType>(BLOCK_ENDPOINT, block)

const deleteBlock = async (id: string) => remove<BlockType>(BLOCK_ENDPOINT, id)

export { listBlocks, readBlock, createBlock, updateBlock, deleteBlock }
