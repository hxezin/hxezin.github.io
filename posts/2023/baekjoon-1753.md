---
title: '[백준/JavaScript] 1753 최단경로'
description: '백준 최단경로 문제를 JavaScript로 해결합니다.'
date: '2023-11-10'
category: '알고리즘'
tags: ['JavaScript']
---

## 문제 출처

[[백준] 최단경로](https://www.acmicpc.net/problem/1753)

## 문제 설명

방향그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하는 프로그램을 작성하시오. 단, 모든 간선의 가중치는 10 이하의 자연수이다.

### 입력

첫째 줄에 정점의 개수 V와 간선의 개수 E가 주어진다. (1 ≤ V ≤ 20,000, 1 ≤ E ≤ 300,000) 모든 정점에는 1부터 V까지 번호가 매겨져 있다고 가정한다. 둘째 줄에는 시작 정점의 번호 K(1 ≤ K ≤ V)가 주어진다. 셋째 줄부터 E개의 줄에 걸쳐 각 간선을 나타내는 세 개의 정수 (u, v, w)가 순서대로 주어진다. 이는 u에서 v로 가는 가중치 w인 간선이 존재한다는 뜻이다. u와 v는 서로 다르며 w는 10 이하의 자연수이다. 서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의한다.

### 출력

첫째 줄부터 V개의 줄에 걸쳐, i번째 줄에 i번 정점으로의 최단 경로의 경로값을 출력한다. 시작점 자신은 0으로 출력하고, 경로가 존재하지 않는 경우에는 INF를 출력하면 된다.

## 문제 풀이

이 문제는 주어진 시작 정점에서 모든 정점까지의 최단 경로를 찾는 문제로, **다익스트라 알고리즘**을 사용하여 해결할 수 있습니다. 먼저 주어진 입력을 파싱하여 그래프를 표현하는 자료 구조를 만들었습니다. 

```jsx
// 입력 처리
const [V, E] = input[0].split(' ').map(Number);
const start = Number(input[1]);
const edges = input.slice(2).map((edge) => edge.split(' ').map(Number));

// 그래프 초기화
const graph = Array.from({ length: V + 1 }, () => ({}));

// 간선 정보 입력
edges.forEach((edge) => {
  const [v1, v2, weight] = edge;
  graph[v1][v2] = weight;
});
```

그런 다음 다익스트라 알고리즘을 사용하여 시작 정점에서 다른 정점으로의 최단 경로를 계산했습니다.

```jsx
const distances = Array(V + 1).fill(Infinity); // 시작점에서 각 정점까지의 거리
const visited = Array(V + 1).fill(false); // 정점 방문 유무

// 아직 방문하지 않은 정점 중에서 최단 거리의 정점을 찾는 함수
const minDistanceVertex = (distances, visited) => {
  let minDistance = Infinity;
  let minVertex = null;

  for (let i = 1; i <= V; i++) {
    if (!visited[i] && distances[i] < minDistance) {
      minDistance = distances[i];
      minVertex = i;
    }
  }

  return minVertex;
};

distances[start] = 0; // 시작점 자신까지의 거리는 0

while (true) {
  const currentVertex = minDistanceVertex(distances, visited);
  if (!currentVertex) break;

  visited[currentVertex] = true;

	// 최단 거리의 정점에 인접한 정점들의 거리 업데이트
  for (let neighbor in graph[currentVertex]) {
    const newDistance =
      distances[currentVertex] + graph[currentVertex][neighbor];
    if (!visited[neighbor] && newDistance < distances[neighbor]) {
      distances[neighbor] = newDistance;
      visited[neighbor] = false;
    }
  }
}
```

다익스트라 알고리즘에 맞는 로직을 작성했다고 생각했는데 계속 8-10%에서 틀린 결과가 나왔습니다. 문제에서 제가 놓친 부분이 있었습니다.

> 서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의한다.
> 

예를 들어 1에서 5까지 가는데 가중치가 2인 간선과 5인 간선이 존재할 수 있다는 것을 놓쳤던 것입니다. 그래서 간선을 설정하는 코드를 다음과 같이 수정했고, 문제를 해결할 수 있었습니다.

```jsx
edges.forEach((edge) => {
  const [v1, v2, weight] = edge;
  graph[v1][v2] = graph[v1][v2] ? Math.min(graph[v1][v2], weight) : weight;
});
```

### 최종 코드

```jsx
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const parseInput = (input) => {
  const [V, E] = input[0].split(' ').map(Number);
  const start = Number(input[1]);
  const edges = input.slice(2).map((edge) => edge.split(' ').map(Number));

  const graph = Array.from({ length: V + 1 }, () => ({}));

  edges.forEach((edge) => {
    const [v1, v2, weight] = edge;
    graph[v1][v2] = graph[v1][v2] ? Math.min(graph[v1][v2], weight) : weight;
  });

  return { V, start, graph };
};

const minDistanceVertex = (distances, visited) => {
  return distances.reduce(
    (min, dist, idx) => (!visited[idx] && dist < distances[min] ? idx : min),
    0
  );
};

function dijkstra({ V, start, graph }) {
  const distances = Array(V + 1).fill(Infinity);
  const visited = Array(V + 1).fill(false);

  distances[start] = 0;

  while (true) {
    const currentVertex = minDistanceVertex(distances, visited);
    if (!currentVertex) break;

    visited[currentVertex] = true;

    for (let neighbor in graph[currentVertex]) {
      const newDistance =
        distances[currentVertex] + graph[currentVertex][neighbor];
      if (!visited[neighbor] && newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
      }
    }
  }

  return distances.slice(1).map((dist) => (dist === Infinity ? 'INF' : dist));
}

const result = dijkstra(parseInput(input)).join('\n');
console.log(result);
```