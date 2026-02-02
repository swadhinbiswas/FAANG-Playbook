# DSA Topic Breakdown: Patterns & Intuition

**Purpose:** Master LeetCode-style problems by understanding underlying patterns, not just memorizing solutions.

---

## **1. Arrays & Strings**

### **Core Pattern: Sliding Window**

Use when: "Find max/min subarray," "substring with k distinct chars," "longest without repeating."

**Intuition:** Two pointers (left, right) expand right until condition breaks, then shrink left.

```
while right < len(arr):
    # Add arr[right] to window
    while window_invalid():
        # Remove arr[left] from window
        left += 1
    # Process valid window
    right += 1
```

**Key problems:**

- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) — Track char frequencies; expand/shrink
- [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/) — Track 0s flipped; shrink when flips exceeded
- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) — Track required chars; find smallest valid window

**Time complexity:** O(n) (each element visited twice)

---

### **Core Pattern: Two Pointer**

Use when: "Find pair with sum," "partition array," "reverse array."

**Intuition:** Start from opposite ends; move based on condition.

```
left, right = 0, len(arr) - 1
while left < right:
    if arr[left] + arr[right] == target:
        return [left, right]
    elif arr[left] + arr[right] < target:
        left += 1
    else:
        right -= 1
```

**Key problems:**

- [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) — Classic two-pointer
- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) — Greedy: shrink from smaller edge
- [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) — Two pointer or DP

**Time complexity:** O(n)

---

### **Core Pattern: Prefix Sum**

Use when: "Sum of subarray," "range query," "avoid recomputation."

**Intuition:** Precompute cumulative sums; answer queries in O(1).

```
prefix = [0]
for num in arr:
    prefix.append(prefix[-1] + num)
# Sum from i to j = prefix[j+1] - prefix[i]
```

**Key problems:**

- [Range Sum Query](https://leetcode.com/problems/range-sum-query-immutable/) — Classic prefix sum
- [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) — Prefix sum + hashmap
- [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) — Kadane's algorithm (prefix thinking)

**Time complexity:** O(n) preprocessing; O(1) per query

---

## **2. Trees & Graphs**

### **Core Pattern: DFS (Depth-First Search)**

Use when: "Visit all nodes," "find paths," "detect cycles."

**Intuition:** Go deep first; backtrack when stuck.

```
def dfs(node, visited):
    if node in visited:
        return
    visited.add(node)
    for neighbor in node.neighbors:
        dfs(neighbor, visited)
```

**Key problems:**

- [Number of Islands](https://leetcode.com/problems/number-of-islands/) — Mark visited; count components
- [Clone Graph](https://leetcode.com/problems/clone-graph/) — DFS + map old→new
- [Word Search](https://leetcode.com/problems/word-search/) — DFS with backtracking on grid

**Time complexity:** O(V + E) where V = vertices, E = edges

---

### **Core Pattern: BFS (Breadth-First Search)**

Use when: "Shortest path in unweighted graph," "level-by-level traversal," "find closest."

**Intuition:** Explore layer by layer; use queue.

```
from collections import deque
q = deque([start])
visited = {start}
while q:
    node = q.popleft()
    for neighbor in node.neighbors:
        if neighbor not in visited:
            visited.add(neighbor)
            q.append(neighbor)
```

**Key problems:**

- [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/) — BFS for shortest path
- [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) — Multi-source BFS
- [Word Ladder](https://leetcode.com/problems/word-ladder/) — BFS for shortest transformation

**Time complexity:** O(V + E)

---

### **Core Pattern: Binary Search Tree (BST) Properties**

Use when: "Validate BST," "search in BST," "construct from traversal."

**Intuition:** Left < Node < Right. Inorder traversal yields sorted sequence.

```
def is_valid_bst(node, min_val, max_val):
    if not node:
        return True
    if not (min_val < node.val < max_val):
        return False
    return (is_valid_bst(node.left, min_val, node.val) and
            is_valid_bst(node.right, node.val, max_val))
```

**Key problems:**

- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) — Bounds checking
- [Lowest Common Ancestor of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) — BST property simplifies problem
- [Kth Smallest Element in BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) — Inorder gives sorted

**Time complexity:** O(n) avg for balanced tree

---

### **Core Pattern: Tree Traversals**

Use when: "Visit all nodes in specific order," "serialize/deserialize."

**Inorder (Left, Node, Right):** Sorted for BST
**Preorder (Node, Left, Right):** Good for cloning/serializing
**Postorder (Left, Right, Node):** Good for deletion/collecting info

```
def inorder(node):
    if not node: return []
    return inorder(node.left) + [node.val] + inorder(node.right)
```

**Key problems:**

- [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
- [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) — Preorder often easiest
- [Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) — Postorder thinking

---

## **3. Dynamic Programming (DP)**

### **Core Pattern: 1D DP (Optimal Sequence)**

Use when: "Maximum/minimum value up to position i," "count ways."

**Intuition:** `dp[i]` = best solution for subproblem ending at i.

```
dp[0] = base_case
for i in range(1, n):
    dp[i] = compute_from_previous(dp[i-1], dp[i-2], ...)
```

**Key problems:**

- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) — `dp[i] = dp[i-1] + dp[i-2]`
- [House Robber](https://leetcode.com/problems/house-robber/) — `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`
- [Maximum Subarray (Kadane)](https://leetcode.com/problems/maximum-subarray/) — `dp[i] = max(nums[i], dp[i-1] + nums[i])`

**Time complexity:** O(n)
**Space complexity:** O(n) or O(1) with rolling variables

---

### **Core Pattern: 2D DP (Optimal Subsequence/Path)**

Use when: "Find path in grid," "match two sequences," "partition array."

**Intuition:** `dp[i][j]` = best solution considering first i elements of seq1, first j of seq2.

```
dp = [[0] * (n+1) for _ in range(m+1)]
for i in range(1, m+1):
    for j in range(1, n+1):
        dp[i][j] = max(
            dp[i-1][j],      # skip seq1[i-1]
            dp[i][j-1],      # skip seq2[j-1]
            compute_match(dp[i-1][j-1], seq1[i-1], seq2[j-1])
        )
```

**Key problems:**

- [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) — Classic 2D DP
- [Edit Distance](https://leetcode.com/problems/edit-distance/) — Match two strings with ops
- [Unique Paths](https://leetcode.com/problems/unique-paths/) — Count grid paths
- [Coin Change](https://leetcode.com/problems/coin-change/) — Min coins to make amount

**Time complexity:** O(m × n)
**Space complexity:** O(m × n) or O(min(m,n)) with rolling array

---

### **Core Pattern: Bounded Knapsack / State Compression**

Use when: "Maximize value with weight limit," "partition into subsets."

**Intuition:** `dp[w]` = max value achievable with weight exactly w (or at most w).

```
dp = [0] * (capacity + 1)
for item in items:
    for w in range(capacity, item.weight - 1, -1):  # Reverse to avoid reuse
        dp[w] = max(dp[w], dp[w - item.weight] + item.value)
```

**Key problems:**

- [0/1 Knapsack](https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/) — Classic knapsack
- [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) — Knapsack with value=weight
- [Target Sum](https://leetcode.com/problems/target-sum/) — Partition into +/- groups

**Time complexity:** O(n × capacity)

---

## **4. Heaps & Priority Queues**

### **Core Pattern: Max/Min Heap**

Use when: "Find kth largest/smallest," "online top k elements," "huffman coding."

**Intuition:** Heap maintains sorted order efficiently; peek top in O(1), extract in O(log n).

```python
import heapq
min_heap = [3, 1, 2]
heapq.heapify(min_heap)  # O(n)
heapq.heappush(min_heap, 0)  # O(log n)
min_val = heapq.heappop(min_heap)  # O(log n)
```

**Note:** Python only has min heap; use negative values for max heap.

**Key problems:**

- [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) — Min heap of size k
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) — Heap + frequency map
- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) — Min heap for merge
- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) — Two heaps (max + min)

**Time complexity:** O(log n) per op; O(n log k) for k-largest

---

### **Core Pattern: Dijkstra's Algorithm**

Use when: "Shortest path with weighted edges," "network delay."

**Intuition:** Greedy + heap; always expand closest unvisited node.

```
dist = {node: float('inf')}
dist[start] = 0
heap = [(0, start)]

while heap:
    d, node = heapq.heappop(heap)
    if d > dist[node]:
        continue
    for neighbor, edge_weight in graph[node]:
        new_dist = d + edge_weight
        if new_dist < dist[neighbor]:
            dist[neighbor] = new_dist
            heapq.heappush(heap, (new_dist, neighbor))
```

**Key problems:**

- [Network Delay Time](https://leetcode.com/problems/network-delay-time/) — Dijkstra from source
- [Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/) — Dijkstra variant

**Time complexity:** O((V + E) log V) with binary heap

---

## **5. Hashing & Frequency**

### **Core Pattern: Frequency Count**

Use when: "Find duplicates," "track occurrence," "anagram."

**Intuition:** Use hashmap to count frequencies; check conditions.

```python
from collections import Counter
freq = Counter(arr)
for val, count in freq.items():
    if count > 1:
        # Found duplicate
```

**Key problems:**

- [Valid Anagram](https://leetcode.com/problems/valid-anagram/) — Compare frequency maps
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/) — Map sorted string → group
- [Majority Element](https://leetcode.com/problems/majority-element/) — Find element with count > n/2

---

### **Core Pattern: HashMap for Fast Lookup**

Use when: "Two Sum," "longest sequence," "substring without repeating."

**Intuition:** Trade space for time; store seen values for O(1) lookup.

```python
seen = {}
for i, num in enumerate(arr):
    complement = target - num
    if complement in seen:
        return [seen[complement], i]
    seen[num] = i
```

**Key problems:**

- [Two Sum](https://leetcode.com/problems/two-sum/) — Classic hashmap
- [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) — Smart iteration with set

---

## **6. Bit Manipulation**

### **Core Pattern: Bit Flags & XOR**

Use when: "Track boolean state," "find single element," "swap without temp."

**Intuition:**

- XOR properties: `a ^ a = 0`, `a ^ 0 = a`, XOR is commutative
- Bit flag: test with `val & (1 << i)`, set with `val |= (1 << i)`

```python
# Find single element in array where all others appear twice
result = 0
for num in arr:
    result ^= num  # Duplicates cancel out
return result

# Check if ith bit is set
if (num & (1 << i)) != 0:
    print(f"Bit {i} is set")
```

**Key problems:**

- [Single Number](https://leetcode.com/problems/single-number/) — XOR trick
- [Single Number II](https://leetcode.com/problems/single-number-ii/) — Bit counting (harder)
- [Hamming Distance](https://leetcode.com/problems/hamming-distance/) — Count differing bits (XOR)
- [Reverse Bits](https://leetcode.com/problems/reverse-bits/) — Bit manipulation

---

### **Core Pattern: Bit Counting & Powers of 2**

Use when: "Count set bits," "check if power of 2," "optimization."

**Intuition:**

- `n & (n-1)` removes rightmost set bit; useful for checking power of 2 or bit count
- `bin(n).count('1')` counts set bits in Python

```python
# Check if power of 2
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0

# Count set bits
def count_set_bits(n):
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count
```

**Key problems:**

- [Power of Two](https://leetcode.com/problems/power-of-two/) — Bit trick
- [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) — Bit counting

---

## **Study Strategy**

### **Week 1–2: Master Basics**

1. Sliding window (2 problems/day)
2. Two pointer (2 problems/day)
3. Prefix sum (1 problem/day)

### **Week 3–4: Trees & Graphs**

1. DFS / BFS (2 problems/day)
2. BST properties (1 problem/day)
3. Traversals (1 problem/day)

### **Week 5–6: DP**

1. 1D DP (2 problems/day)
2. 2D DP (2 problems/day)

### **Week 7–8: Heaps, Hashing, Bits**

1. Heap problems (1 problem/day)
2. Frequency maps (1 problem/day)
3. Bit problems (1 problem/day)

---

## **Interview Tips**

1. **Identify the pattern** — Many problems fit standard patterns
2. **Start simple** — Code brute force first; optimize after
3. **Communicate** — Explain your approach before coding
4. **Test edge cases** — Empty input, single element, duplicates, large numbers
5. **Optimize space** — Can you use O(1) instead of O(n)?

**Pro tip:** When stuck, ask: "What are the constraints? Is there a space-time tradeoff?"
