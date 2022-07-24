import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import currency from 'currency.js'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { FiStar, FiMapPin, FiGlobe, FiLayers } from 'react-icons/fi'

type DescriptionItemsProps = {
  label: string
  value: string
}

const DescriptionItems = ({ label, value }: DescriptionItemsProps) => {
  return (
    <div className="flex flex-row justify-between px-6 py-5">
      <p>{label}</p>
      <p className="font-bold text-right">{value}</p>
    </div>
  )
}

const CarByID: NextPage = ({ car, medias }: any) => {
  const router = useRouter()
  const carID = typeof router.query?.id === 'string' ? router.query.id : ''

  return (
    <>
      <Head>
        <title>{car.carName}</title>
      </Head>
      <div className="container mx-auto my-10">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 border border-solid border-gray-100 rounded-lg">
            <Carousel showThumbs={false}>
              {medias.carMediaList.map((car: any, i: number) => (
                <div key={i} className="relative h-[600px] mx-auto">
                  <Image
                    className="!relative object-cover w-full h-full rounded-t-lg"
                    src={car.url}
                    alt={`${car.name} image`}
                    layout="fill"
                    quality={100}
                    objectFit="cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </Carousel>

            <div className="p-6">
              <p className="text-[24px] font-medium">{car.carName}</p>

              <div className="flex flex-row items-center gap-x-1 mb-5">
                <FiStar className="text-yellow-500 fill-yellow-400 text-[14px]" />
                <p className="text-[14px]">
                  {car.gradeScore?.toFixed(1) || 'No rating'}
                </p>
              </div>

              <div className="flex flex-row gap-x-6 mb-5">
                <div className="flex flex-row items-center gap-x-2">
                  <FiLayers className="text-[14px]" />
                  <p className="text-[14px]">
                    {car.mileage} {car.mileageUnit}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-x-2">
                  <FiMapPin className="text-[14px]" />
                  <p className="text-[14px]">{car.city}</p>
                </div>

                <div className="flex flex-row items-center gap-x-2">
                  <FiGlobe className="text-[14px]" />
                  <p className="text-[14px]">{car.sellingCondition}</p>
                </div>
              </div>

              <p className="mb-1 text-[13px] text-gray-400">
                You can get this car for
              </p>
              <p className="text-[28px] font-mono">
                {currency(car.marketplacePrice, {
                  symbol: '₦',
                  fromCents: true,
                  precision: 0
                }).format()}
              </p>
            </div>
          </div>

          <div className="border border-solid border-gray-100 rounded-lg">
            <p className="text-[22px] px-6 py-5 border-b-[1px] border-transparent border-b-gray-100 border-solid">
              Vehicle Description
            </p>

            <div className="striped">
              <DescriptionItems label="Engine Type" value={car.engineType} />
              <DescriptionItems
                label="Engine Capacity (cc)"
                value="Approx. N/A"
              />
              <DescriptionItems label="Transmission" value={car.transmission} />
              <DescriptionItems label="Fuel Type" value={car.fuelType} />
              <DescriptionItems
                label="Interior color"
                value={car.interiorColor}
              />
              <DescriptionItems
                label="Exterior color"
                value={car.exteriorColor}
              />
              <DescriptionItems label="VIN" value={car.vin} />
              <DescriptionItems label="Vehicle ID" value={car.id} />
              <DescriptionItems
                label="Inspector's name"
                value={
                  car.inspectorDetails?.inspectorFullName || 'Data not provided'
                }
              />
              <DescriptionItems
                label="Inspector's workshop"
                value={car.inspectorDetails?.workshopName || 'car not provided'}
              />
              <DescriptionItems
                label="Total inspections"
                value={
                  car.inspectorDetails?.totalInspection || 'Data not provided'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CarByID

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string

  const singleCarRes = await fetch(
    `https://api-prod.autochek.africa/v1/inventory/car/${id}`
  )

  const singleCar = await singleCarRes.json()

  const mediaRes = await fetch(
    `https://api-prod.autochek.africa/v1/inventory/car_media?carId=${id}`
  )

  const medias = await mediaRes.json()

  return {
    props: {
      car: singleCar,
      medias
    }
  }
}
