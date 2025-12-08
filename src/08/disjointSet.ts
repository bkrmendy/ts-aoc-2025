/**
 * https://gist.github.com/Phryxia/ff188aca6612efb388bcf19c0b525fc1
 */
export function createDisjointSet(initialSize: number) {
  const roots = Array.from(new Array(initialSize), (_, index) => index)
  const sizes = roots.map(() => 1)
  let groups = initialSize

  // return the id of the set which given index-th element exists.
  // but set id may changes if further union operations are done.
  function find(index: number): number {
    if (roots[index] === index) return index
    return (roots[index] = find(roots[index]!))
  }

  function union(ia: number, ib: number): void {
    let rootA = find(ia)
    let rootB = find(ib)

    if (rootA === rootB) return

    if (sizes[rootA]! < sizes[rootB]!) {
      ;[rootA, rootB] = [rootB, rootA]
    }

    roots[rootB] = rootA
    sizes[rootA]! += sizes[rootB]!
    groups -= 1
  }

  // return the size of the set which has index-th element.
  // if index is not given, return the number of dijoint sets.
  function size(index?: number): number {
    if (index === undefined) return groups
    return sizes[find(index)]!
  }

  return {
    find,
    union,
    size,
    sizes
  }
}
