import { FC } from 'react'

type Videos = Array<any>
interface ProductVideoProps {
  videos: Videos
}

const ProductVideos: FC<ProductVideoProps> = ({ videos }) => {
  const getVideoDescription = (desc: string) => {
    if (desc) {
      if (desc.length > 62) return desc.slice(0, 62) + '...'
      else return desc
    }
  }

  return (
    <div className="mt-8">
      <hr />
      <h1 className="mt-8 text-2xl mb-8">Videos</h1>

      {videos?.map((video) => {
        return (
          <div key={video.id}>
            <iframe
              width="100%"
              height="600px"
              src={`https://youtube.com/embed/${video?.video_id}`}
            ></iframe>
            <div className="flex mt-5">
              <img
                src={`http://i.ytimg.com/vi/${video?.video_id}/default.jpg`}
                alt={video?.title}
              />
              <div className="flex flex-col ml-5">
                <h1>{video?.title}</h1>
                <p>{getVideoDescription(video?.description)}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductVideos
