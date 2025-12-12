import { describe, test, expect } from 'bun:test'
import { PriorityQueue } from './priority-queue'

describe('PriorityQueue', () => {
  describe('isEmpty', () => {
    test('returns true for new queue', () => {
      const queue = new PriorityQueue<number>()
      expect(queue.isEmpty()).toBeTrue()
    })

    test('returns false when queue has items', () => {
      const queue = new PriorityQueue<number>()
      queue.enqueue(1, 1)
      expect(queue.isEmpty()).toBeFalse()
    })

    test('returns true after dequeuing all items', () => {
      const queue = new PriorityQueue<number>()
      queue.enqueue(1, 1)
      queue.dequeue()
      expect(queue.isEmpty()).toBeTrue()
    })
  })

  describe('size', () => {
    test('returns 0 for new queue', () => {
      const queue = new PriorityQueue<number>()
      expect(queue.size()).toBe(0)
    })

    test('returns correct size as items are added', () => {
      const queue = new PriorityQueue<number>()
      queue.enqueue(1, 1)
      expect(queue.size()).toBe(1)
      queue.enqueue(2, 2)
      expect(queue.size()).toBe(2)
      queue.enqueue(3, 3)
      expect(queue.size()).toBe(3)
    })

    test('returns correct size as items are removed', () => {
      const queue = new PriorityQueue<number>()
      queue.enqueue(1, 1)
      queue.enqueue(2, 2)
      queue.enqueue(3, 3)
      queue.dequeue()
      expect(queue.size()).toBe(2)
      queue.dequeue()
      expect(queue.size()).toBe(1)
    })
  })

  describe('enqueue and dequeue', () => {
    test('dequeues items in priority order (lowest priority first)', () => {
      const queue = new PriorityQueue<string>()
      queue.enqueue('low', 1)
      queue.enqueue('medium', 5)
      queue.enqueue('high', 10)

      expect(queue.dequeue()).toBe('low')
      expect(queue.dequeue()).toBe('medium')
      expect(queue.dequeue()).toBe('high')
    })

    test('handles items with same priority in FIFO order', () => {
      const queue = new PriorityQueue<string>()
      queue.enqueue('first', 5)
      queue.enqueue('second', 5)
      queue.enqueue('third', 5)

      expect(queue.dequeue()).toBe('first')
      expect(queue.dequeue()).toBe('second')
      expect(queue.dequeue()).toBe('third')
    })

    test('maintains order when inserting items in random priority order', () => {
      const queue = new PriorityQueue<number>()
      queue.enqueue(5, 5)
      queue.enqueue(1, 1)
      queue.enqueue(10, 10)
      queue.enqueue(3, 3)
      queue.enqueue(7, 7)

      expect(queue.dequeue()).toBe(1)
      expect(queue.dequeue()).toBe(3)
      expect(queue.dequeue()).toBe(5)
      expect(queue.dequeue()).toBe(7)
      expect(queue.dequeue()).toBe(10)
    })

    test('returns undefined when dequeuing from empty queue', () => {
      const queue = new PriorityQueue<number>()
      expect(queue.dequeue()).toBeUndefined()
    })

    test('handles negative priorities', () => {
      const queue = new PriorityQueue<string>()
      queue.enqueue('negative', -5)
      queue.enqueue('zero', 0)
      queue.enqueue('positive', 5)

      expect(queue.dequeue()).toBe('negative')
      expect(queue.dequeue()).toBe('zero')
      expect(queue.dequeue()).toBe('positive')
    })

    test('works with complex objects', () => {
      interface Task {
        name: string
        id: number
      }

      const queue = new PriorityQueue<Task>()
      queue.enqueue({ name: 'Task A', id: 1 }, 3)
      queue.enqueue({ name: 'Task B', id: 2 }, 1)
      queue.enqueue({ name: 'Task C', id: 3 }, 2)

      expect(queue.dequeue()).toEqual({ name: 'Task B', id: 2 })
      expect(queue.dequeue()).toEqual({ name: 'Task C', id: 3 })
      expect(queue.dequeue()).toEqual({ name: 'Task A', id: 1 })
    })
  })

  describe('peek', () => {
    test('returns undefined for empty queue', () => {
      const queue = new PriorityQueue<number>()
      expect(queue.peek()).toBeUndefined()
    })

    test('returns first item without removing it', () => {
      const queue = new PriorityQueue<string>()
      queue.enqueue('first', 1)
      queue.enqueue('second', 2)

      expect(queue.peek()).toBe('first')
      expect(queue.size()).toBe(2)
      expect(queue.peek()).toBe('first')
    })

    test('returns item with lowest priority', () => {
      const queue = new PriorityQueue<number>()
      queue.enqueue(10, 10)
      queue.enqueue(5, 5)
      queue.enqueue(1, 1)

      expect(queue.peek()).toBe(1)
    })

    test('updates after dequeue', () => {
      const queue = new PriorityQueue<string>()
      queue.enqueue('A', 1)
      queue.enqueue('B', 2)
      queue.enqueue('C', 3)

      expect(queue.peek()).toBe('A')
      queue.dequeue()
      expect(queue.peek()).toBe('B')
      queue.dequeue()
      expect(queue.peek()).toBe('C')
    })
  })

  describe('integration scenarios', () => {
    test('handles alternating enqueue and dequeue operations', () => {
      const queue = new PriorityQueue<number>()

      queue.enqueue(5, 5)
      queue.enqueue(3, 3)
      expect(queue.dequeue()).toBe(3)

      queue.enqueue(1, 1)
      queue.enqueue(4, 4)
      expect(queue.dequeue()).toBe(1)
      expect(queue.dequeue()).toBe(4)
      expect(queue.dequeue()).toBe(5)
      expect(queue.isEmpty()).toBeTrue()
    })

    test('handles large number of items', () => {
      const queue = new PriorityQueue<number>()
      const items = 1000

      // Add items in reverse order
      for (let i = items; i > 0; i--) {
        queue.enqueue(i, i)
      }

      expect(queue.size()).toBe(items)

      // Dequeue should return items in ascending order
      for (let i = 1; i <= items; i++) {
        expect(queue.dequeue()).toBe(i)
      }

      expect(queue.isEmpty()).toBeTrue()
    })

    test('works with floating point priorities', () => {
      const queue = new PriorityQueue<string>()
      queue.enqueue('A', 1.5)
      queue.enqueue('B', 1.1)
      queue.enqueue('C', 1.9)
      queue.enqueue('D', 1.0)

      expect(queue.dequeue()).toBe('D')
      expect(queue.dequeue()).toBe('B')
      expect(queue.dequeue()).toBe('A')
      expect(queue.dequeue()).toBe('C')
    })
  })
})
