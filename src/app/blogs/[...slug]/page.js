export default async function BlogLayout({params})
{

    const {slug} = await params
    return (
        <div>
            BlogLayout : {slug}
        </div>
    )
 }