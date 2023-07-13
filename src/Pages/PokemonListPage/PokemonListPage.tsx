import { FC, useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { getPokemonsListRequest } from '../../requests/getPokemons'
import { PokemonItemDto } from '../../requests/dto'
import Loader from '../../components/Loader'
import PokemonListFilter from './PokemonListFilter'
import { useRequestState } from '../../hooks/useRequestState'
import ErrorPage from '../ErrorPage/ErrorPage'
import PokemonList from './PokemonList'
import styles from './PokemonListPage.module.scss'
import { useSearchParams } from 'react-router-dom'
import Paginator from '../../components/Paginator/Paginator'
import { PAGE_SIZE } from '../../config/main'

const PokemonListPage: FC = () => {
  const [pokemonListData, setPokemonListData] = useState<PokemonItemDto[]>()
  const { requestState, setRequestState } = useRequestState()
  const [searchParams, setSearchParams] = useSearchParams()
  const controllerRef = useRef<AbortController>()
  const [totalCount, setTotalCount] = useState<number>(0)

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

  const fetchData = useCallback(async () => {
    if (!controllerRef.current) {
      controllerRef.current = new AbortController()
    }

    const pokemonName = searchParams.get('name') ?? ''

    setRequestState('loading')

    try {
      const response = await getPokemonsListRequest({
        name: pokemonName,
        page: currentPage,
        types: searchParams.getAll('types').map((value) => parseInt(value)),
        signal: controllerRef.current?.signal,
      })

      if (response.error) {
        throw response.error
      }

      const { page, items, count } = response.data
      if (page !== currentPage) {
        return
      }
      setPokemonListData(items)
      setTotalCount(count)
      setRequestState('success')
    } catch (err) {
      setRequestState('error')
    }
  }, [currentPage, searchParams, setRequestState])

  const onFilter = () => {
    controllerRef.current?.abort()
  }

  useEffect(() => {
    fetchData()
    return () => {
      controllerRef.current?.abort()
      controllerRef.current = undefined
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <div className={styles.container}>
      {requestState === 'error' ? (
        <ErrorPage />
      ) : (
        <>
          <PokemonListFilter onFilter={onFilter} />
          {requestState === 'success' && pokemonListData ? (
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
          {requestState === 'loading' ? <Loader /> : null}
        </>
      )}
    </div>
  )
}

export default PokemonListPage
