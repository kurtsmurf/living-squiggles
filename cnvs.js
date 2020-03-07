const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')
c.lineWidth = 3

let lastEvent

const handleMouseDown = (e) => {
    lastEvent = e
}

const handleMouseMove = (e, lastEvent) => {
    if (e.buttons) {
        c.beginPath()
        c.moveTo(lastEvent.clientX, lastEvent.clientY)
        c.lineTo(e.clientX, e.clientY)
        c.stroke()
        c.closePath()

        lastEvent = e
    }
}

canvas.addEventListener('mousedown', handleMouseDown)
canvas.addEventListener('mousemove', (e) => handleMouseMove(e, lastEvent))

const frames = []

const setPrevFrameGuide = () => {
    val = `url(${frames[frames.length - 1]})`
    document.body.style.backgroundImage = val
}

const addFrame = () => {
    const url = canvas.toDataURL('images/jpg')
    frames.push(url)
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    setPrevFrameGuide()
}

let isAnimating = false
let wait = 100
let startIndex = 0
let animationId

const animate = (index) => {
    canvas.style.backgroundImage = `url(${frames[index]})`
    const next = ++index % frames.length
    animationId = setTimeout(() => {animate(next)}, wait)
}

const enableDrawing = () => {
    canvas.addEventListener('mousedown', handleMouseDown)
}

const disableDrawing = () => {
    canvas.removeEventListener('mousedown', handleMouseDown)
}

const startAnimation = () => {
    disableDrawing()
    setPrevFrameGuide('unset')
    animate(startIndex)
    isAnimating = true
}

const stopAnimation = () => {
    canvas.style.backgroundImage = 'unset'
    enableDrawing()
    setPrevFrameGuide()
    clearTimeout(animationId)
    isAnimating = false
}

const toggleAnimation = () => {
    if (isAnimating) {
        stopAnimation()
    } else {
        startAnimation()
    }
}

function handleKeyPress(e) {
    if (e.key === 'Enter') addFrame()
    else if (e.key === '\\') toggleAnimation()
}

window.addEventListener('keypress', handleKeyPress)