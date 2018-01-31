# react-interactjs-wrapper

[![npm version](https://badge.fury.io/js/react-interactjs-wrapper.svg)](https://badge.fury.io/js/react-interactjs-wrapper)
[![Build Status][travis-image]][travis-url]

## Install:
```
npm install react-interactjs-wrapper --save
```

## Props:

|Props| Type | Description
|---|---|----|
| _draggable_ | Bool | Is the child object supposed to be draggable? |
| _draggableOptions_ | Object | Options to pass to the draggable method |
| _resizable_ | Bool | Is the child object supposed to be resizable? |
| _resizableOptions_ | Object | Options to pass to the resizable method |

## Example:
```
import React from 'react'
import { render } from 'react-dom'
import InteractWrapper from 'react-interactjs-wrapper'

const draggableOptions = {
     onmove: event => {
        const target = event.target
      // keep the dragged position in the data-x/data-y attributes
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
}

const example = (
    <InteractWrapper draggable draggableOptions={draggableOptions}>
        <img src="https://pbs.twimg.com/profile_images/526421493731717120/INda0NaM.png" height={100} width={100}/>
    </InteractWrapper>
)

render(example, document.getElementById('container'));
```

## License:

[MIT](https://github.com/VictorParraCant/react-interactjs-wrapper/blob/master/LICENSE)
