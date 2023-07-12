import { FC, useEffect, useState, useCallback, useRef } from 'react'
import { getPokemonsListRequest } from '../../requests/getPokemons'
import { PokemonItemDto } from '../../requests/dto'
import Loader from '../../components/Loader'
import PokemonListFilter from './PokemonListFilter'
import { useRequestState } from '../../hooks/useRequestState'
import ErrorPage from '../ErrorPage/ErrorPage'
import PokemonList from './PokemonList'
import styles from './PokemonListPage.module.scss'
import { useSearchParams } from 'react-router-dom'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import usePaginationParams from '../../hooks/usePaginationParams'

const PokemonListPage: FC = () => {
  const [pokemonListData, setPokemonListData] = useState<PokemonItemDto[]>()
  const { requestState, setRequestState } = useRequestState()
  const [searchParams, setSearchParams] = useSearchParams()
  const controllerRef = useRef<AbortController>()

  const { clearPages, updatePagination, getPagination } = usePaginationParams()

  const resetList = () => {
    setSearchParams()
  }

  const fetchData = useCallback(async () => {
    if (!controllerRef.current) {
      controllerRef.current = new AbortController()
    }

    const pagination = getPagination()
    const pokemonName = searchParams.get('name') ?? ''

    if (pagination.page >= pagination.totalPages) {
      return
    }

    setRequestState('loading')

    try {
      const response = await getPokemonsListRequest({
        name: pokemonName,
        page: pagination.page,
        signal: controllerRef.current?.signal,
      })

      if (response.error) {
        throw response.error
      }

      const { page, items, count } = response.data
      if (page !== pagination.page) {
        return
      }
      setPokemonListData((prevItems) => (page > 1 && prevItems ? prevItems.concat(items) : items))
      updatePagination(page + 1, count)
      setRequestState('success')
    } catch (err) {
      setRequestState('error')
    }
  }, [getPagination, searchParams, setRequestState, updatePagination])

  const updateFilter = (filterValue?: string) => {
    const pokemonName = searchParams.get('name') ?? ''

    if (filterValue !== pokemonName) {
      setSearchParams(filterValue ? new URLSearchParams({ name: filterValue }) : undefined)
    } else {
      controllerRef.current?.abort()
      fetchData()
    }
  }
  const observerTargetRef = useInfiniteScroll(fetchData)

  useEffect(() => {
    fetchData()
    return () => {
      clearPages()
      controllerRef.current?.abort()
      controllerRef.current = undefined
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <>
      <div className={styles.container}>
        <PokemonListFilter
          onClear={resetList}
          onFilter={(filterName) => updateFilter(filterName)}
          initialValue={searchParams.get('name') ?? ''}
        />
        {requestState !== 'init' && pokemonListData ? <PokemonList pokemonList={pokemonListData} /> : null}
        {requestState === 'loading' ? <Loader /> : null}
        <div ref={observerTargetRef}></div>
      </div>
      {requestState === 'error' ? <ErrorPage /> : null}
    </>
  )
}

export default PokemonListPage
