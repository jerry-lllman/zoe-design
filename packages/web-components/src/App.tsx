
function App() {

  const test = (e: React.MouseEvent) => {
    console.log(e.pageX, e.pageY)
  }

  return (
    <div className="h-screen" onClick={test}  >
      component
    </div>
  )
}

export default App
