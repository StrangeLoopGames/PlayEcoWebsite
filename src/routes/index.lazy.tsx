import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: () =>
            fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
                res.json()
            ),
    });
    if (isLoading) return <div> Loading</div>
    if (error) return <div>Error: {error.message}</div>
    return (
        <>
            <div className="App">
                <h1>Eco</h1>
            </div>
        </>

    )
}