let fragment = document.createDocumentFragment();

function cloneNode(node) {
  return node.cloneNode(true);
}

function fillAttributes(node, data) {
  return function(key) {
    let dataKey = `data-${key}`;
    let nodeHasAttribute = node.hasAttribute(dataKey);
    if (nodeHasAttribute) {
      node.setAttribute(dataKey, data[key]);
    }
  }
}

function buildNewItem(node) {
  return function(data) {
    if (data) {
      let tempNode = cloneNode(node);
      let fillAttrsNode = tempNode.querySelector('[data-build-fill-attrs]');
      let dataKeys = Object.keys(data);
      dataKeys.forEach(fillData(tempNode, data));
      if (fillAttrsNode) {
        dataKeys.forEach(fillAttributes(fillAttrsNode, data))
      }
      fragment.appendChild(tempNode);
    }
  }
}

function fillData(node, data) {
  return function(key) {
    let buildKey = node.querySelector(`[data-build-${key}]`);
    if (buildKey) {
      if (buildKey.tagName === "IMG") {
        buildKey.src = `http://image.tmdb.org/t/p/w300${data[key]}`;
      } else {
        buildKey.textContent = data[key];
      }
    }
  }
}

export default function builder(node, dataSource) {
  let heldNode = cloneNode(node);
  node.parentNode.removeChild(node);
  dataSource.forEach(buildNewItem(heldNode));
  document.getElementById('resultId').appendChild(fragment);
}
