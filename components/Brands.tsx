import Image from 'next/image'

const Brands = ({ data }: any) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between py-10">
        {data.makeList.map((brand: any, i: number) => (
          <div
            key={i}
            className="border border-solid border-gray-100 h-[92px] w-[92px] rounded-lg cursor-pointer shadow-2xl"
          >
            <div className="relative overflow-hidden h-full group">
              <div className="relative h-full w-[75%] mx-auto">
                <Image
                  className="!relative object-cover w-[75%] h-full"
                  src={brand.imageUrl}
                  alt={`${brand.name} logo`}
                  layout="fill"
                  quality={100}
                  objectFit="contain"
                  loading="lazy"
                />
              </div>

              <div className="absolute px-3 top-0 left-0 w-full h-0 flex flex-col justify-center rounded-lg items-center bg-yellow-400 opacity-0 group-hover:h-full group-hover:opacity-100 duration-200">
                <p className="text-center text-yellow-800">{brand.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Brands
