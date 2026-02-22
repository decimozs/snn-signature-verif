import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/verifications/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/verifications/$id/"!</div>
}
