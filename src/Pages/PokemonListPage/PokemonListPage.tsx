import { FC, useCallback, useMemo } from 'react'
import Loader from '../../components/Loader'
import ErrorPage from '../ErrorPage/ErrorPage'
import styles from './PokemonListPage.module.scss'
import { useSearchParams } from 'react-router-dom'
import Paginator from '../../components/Paginator/Paginator'
import { PAGE_SIZE } from '../../config/main'
import PokemonListFilter from './PokemonListFilter'
import PokemonList from './PokemonList'
import { parseFilterParams } from './PokemonListFilter/pokemonListFilter.utils'
import usePokemonListQuery from '../../hooks/usePokemonListQuery'

const PokemonListPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = useMemo(() => {
    const pageParam = searchParams.get('page')
    const page = pageParam ? parseInt(pageParam) : 1
    return isNaN(page) ? 1 : page
  }, [searchParams])

  const updatePage = useCallback(
    (page: number) => {
      searchParams.set('page', page.toString())
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams],
  )

  const parsedParams = useMemo(() => parseFilterParams(searchParams), [searchParams])
  const { isLoading, data, isError } = usePokemonListQuery({
    ...parsedParams,
    currentPage,
  })
  const { items: pokemonListData, count: totalCount } = data ?? { items: [], count: 0 }

  return (
    <div className={styles.container}>
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <PokemonListFilter />
          {pokemonListData ? (
            <>
              <PokemonList pokemonList={pokemonListData} />
              <Paginator
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={PAGE_SIZE}
                setCurrentPage={updatePage}
              />
            </>
          ) : null}
          {isLoading ? <Loader /> : null}
        </>
      )}
    </div>
  )
}

export default PokemonListPage
