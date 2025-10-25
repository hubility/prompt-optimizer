import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add custom logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Return true if the user is authenticated
        return !!token
      },
    },
  }
)

// Protect these routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/agents/:path*",
    "/settings/:path*"
  ]
}