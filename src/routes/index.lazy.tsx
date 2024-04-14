import { createLazyFileRoute } from '@tanstack/react-router'
export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <>
            <div className="App">
                <h1>Eco</h1>
            </div>
        </>

    )
}