interface LogoProperties {
  className: string
}

export default function Logo(properties: LogoProperties) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...properties}>
      <path d="M4.01 17.558c-.635-.06-.495-1.02-.055-1.095 2.498-.425 5.376 3.035 8.332 3.036 2.956.001 5.835-3.456 8.332-3.031.44.074.58 1.036-.055 1.095-2.535.237-5.33 3.103-8.277 3.102-2.947 0-5.741-2.87-8.277-3.107z" />
      <path d="M11.652 9.907c0 1.357.008 4.522 0 6.735.353-.104.993-.13 1.354 0 .013-2.173-.001-5.385 0-6.735zM4.422 5.06c-.543 0-.668.496-.668.943 0 2.492-.029 5.465-.003 8.198 0 .744.522.709 1.01.718 1.881.244 3.54 1.228 5.206 2.138.274.15.573-.738.681-.897.266-.387-3.603-2.19-5.2-2.459-.152-.058-.387.006-.387-.193 0-2.317-.02-5.007-.02-7.51 0-.46-.032-.937-.62-.937zM20.212 5.095c.542 0 .667.495.667.942 0 2.493.029 5.466.004 8.198 0 .744-.522.71-1.011.72-1.88.243-3.539 1.226-5.205 2.136-.274.15-.573-.737-.682-.896-.265-.387 3.603-2.19 5.2-2.459.152-.059.388.006.388-.194 0-2.316.02-5.006.02-7.51 0-.46.032-.937.619-.937zM6.647 3.536c-.61-.071-.557 1.15-.332 1.219.557.168 1.064.277 1.727.471 1.794.543 3.279 1.595 3.61 3.465h1.354c.33-1.87 1.852-2.922 3.646-3.465.663-.194 1.17-.303 1.726-.471.226-.068.278-1.29-.332-1.219-3.596.42-4.994 2.814-5.7 2.814-.704 0-2.102-2.394-5.699-2.814z" />
    </svg>
  )
}
