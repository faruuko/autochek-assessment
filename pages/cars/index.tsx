import type { NextPage, GetServerSideProps } from 'next'
import { useState, MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import currency from 'currency.js'
import { FiStar, FiMapPin, FiGlobe, FiLayers } from 'react-icons/fi'
import { useRouter } from 'next/router'

import Brands from 'components/Brands'
import Button from 'components/Button'

const AllCars: NextPage = ({ cars, brands }: any) => {
  const router = useRouter()
  const [page, setPage] = useState(parseInt(`${router.query.page}`) || 1)

  function handlePageChange(e: MouseEvent<HTMLElement>, value: number) {
    setPage(value)
    router.push(`cars/?page=${value}`, undefined)
  }

  return (
    <div className="container mx-auto">
      <Brands data={brands} />

      <div className="mx-auto text-center mb-10">
        <Button
          label="Previous"
          disabled={page === 1}
          onClick={(e) => handlePageChange(e, page - 1)}
        />
        &nbsp; &nbsp;
        <Button
          label="Next"
          onClick={(e) => handlePageChange(e, page + 1)}
          disabled={page === cars.pagination.pageSize}
        />
      </div>

      <div className="grid grid-cols-4 gap-6 mx-36 mb-10">
        {cars.result.map((car: any, i: number) => (
          <Link href={`cars/${car.id}`} key={i}>
            <div className="border border-solid border-gray-100 rounded-lg cursor-pointer shadow-none group">
              <div className="relative">
                <div className="w-full h-full rounded-t-lg bg-slate-900/20  absolute z-10 p-3 group-hover:bg-yellow-400/20">
                  <div className="flex flex-row gap-x-3 h-full items-end">
                    <div className="flex items-center bg-white px-3 h-[24px]">
                      <p className="text-[14px]">{car.year}</p>
                    </div>

                    <p className="text-[18px] text-white truncate text-ellipsis">
                      {car.title}
                    </p>
                  </div>
                </div>
                <div className="relative h-64 w-full mx-auto">
                  <Image
                    className="!relative object-cover w-full h-full rounded-t-lg"
                    src={car.imageUrl}
                    alt={`${car.title} image`}
                    layout="fill"
                    quality={100}
                    objectFit="cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-row justify-between items-center mb-1">
                  <p className="text-[18px] font-mono">
                    {currency(car.marketplacePrice, {
                      symbol: '₦',
                      fromCents: true,
                      precision: 0
                    }).format()}
                  </p>

                  <div className="flex flex-row items-center gap-x-1">
                    <FiStar className="text-yellow-500 fill-yellow-400 text-[14px]" />
                    <p className="text-[14px]">
                      {car.gradeScore?.toFixed(1) || 'No rating'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center gap-x-1">
                    <FiLayers className="text-[14px] text-gray-400" />
                    <p className="text-[14px] text-gray-400">
                      {car.mileage} {car.mileageUnit}
                    </p>
                  </div>

                  <div className="flex flex-row items-center gap-x-1">
                    <FiMapPin className="text-[14px] text-gray-400" />
                    <p className="text-[14px] text-gray-400">{car.city}</p>
                  </div>

                  <div className="flex flex-row items-center gap-x-1">
                    <FiGlobe className="text-[14px] text-gray-400" />
                    <p className="text-[14px] text-gray-400">
                      {car.sellingCondition}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllCars

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = 1
  if (context.query.page) {
    page = parseInt(`${context.query.page}`)
  }

  const allCarsRes = await fetch(
    `https://api-prod.autochek.africa/v1/inventory/car/search?page_number=${page}`
  )

  const allCars = await allCarsRes.json()

  const popularBrandRes = await fetch(
    `https://api-prod.autochek.africa/v1/inventory/make?popular=true`
  )

  const popularBrands = await popularBrandRes.json()

  return {
    props: {
      cars: allCars,
      brands: popularBrands
    }
  }
}
