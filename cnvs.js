const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')
c.lineWidth = 3

let lastEvent

canvas.addEventListener('mousedown', function(e) {
    lastEvent = e
})

canvas.addEventListener('mousemove', function(e) {
    if (e.buttons) {
        c.beginPath()
        c.moveTo(lastEvent.clientX, lastEvent.clientY)
        c.lineTo(e.clientX, e.clientY)
        c.stroke()
        c.closePath()

        lastEvent = e
    }
})

const frames = []

const setPrevFrameGuide = (val = `url(${frames[frames.length - 1]})`) => {
    document.body.style.backgroundImage = val
}

const handleAddFrame = (e) => {
    if (e.key === 'Enter') {
        const url = canvas.toDataURL('images/jpg')
        frames.push(url)
        c.clearRect(0, 0, window.innerWidth, window.innerHeight)
        setPrevFrameGuide()
    }
}

window.addEventListener('keypress', handleAddFrame)

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
// todo
}

const disableDrawing = () => {
// todo
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

const handleToggleAnimation = (e) => {
    if (e.key === '\\') {
        if (isAnimating) {
            stopAnimation()
        } else {
            startAnimation()
        }
    }
}
window.addEventListener('keypress', handleToggleAnimation )