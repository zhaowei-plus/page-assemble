export const isContain = (pos, area) => {
  const { x, y } = pos
  const { width, height, left, top, right, bottom } = area

  const wStep = width / 3
  const hStep = height / 3

  const containArea = {
    left: left + wStep,
    right: right - wStep,
    top: top + hStep,
    bottom: bottom - hStep,
  }

  if (isBetween(x, containArea.left, containArea.right) && isBetween(y, containArea.top, containArea.bottom)) {
    return {
      isContain: true
    }
  }
}

export const isLeft = (pos, area) => {
  const { x, y } = pos
  const { width, height, left, top, right, bottom } = area

  const wStep = width * 0.2
  const hStep = height * 0.2

  const containArea = {
    left: left + wStep,
    right: right - wStep,
    top: top + hStep,
    bottom: bottom - hStep,
  }

  return x < containArea.left
}

export const isRight = (pos, area) => {
  const { x, y } = pos
  const { width, height, left, top, right, bottom } = area

  const wStep = width / 3
  const hStep = height / 3

  const containArea = {
    left: left + wStep,
    right: right - wStep,
    top: top + hStep,
    bottom: bottom - hStep,
  }

  return x > containArea.right
}

export const isBetween = (num, min, max) => {
  return min <= num && num <= max
}

export const FormilyToDraggable = () => {

}


export const DraggableToFormily = () => {

}
