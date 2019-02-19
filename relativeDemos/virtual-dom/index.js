// 树的递归

/*
两个节点的对比：
1. 两个tagName或者key不同，则无需比较
2. tagName或者key相同，遍历子树
3. 没有新的节点，什么都不做
*/

export default function diff(oldTree, newTree) {
    const patches = {};
    dfs(oldTree, newTree, 0, patches);
    return patches;
}

function dfs (ol)