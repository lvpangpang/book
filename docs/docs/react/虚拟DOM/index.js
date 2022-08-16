function render(vDom, container) {
  let dom

  if (typeof vDom !== 'object') {
    dom = document.createTextNode()
  } else {
    dom = document.createElement(vDom.type)
  }

  const props = vDom.props
  if (props) {
    Object.keys(props)
      .filter((item) => item !== 'children')
      .forEach((item) => {
        dom.setArrtibute(item, props[item])
      })
  }

  if (props.children) {
    props.children.forEach((item) => render(item, dom))
  }

  container.appendChild(dom)
}
