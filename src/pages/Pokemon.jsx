import { useEffect, useState } from 'react'
import "../index.css";
import PokemonCard from '../components/PokemonCard';
import useAxios from '../../request-composable';
function Pokemon() {
    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState('');
    const { request, loading, error } = useAxios();
    const fetchPokemon = async () => {
        try {
            const data = await request({
                method: "GET",
                url: "/pokemon?limit=200",
            });
            const detailPokemon = data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url)
                const data = await res.json()
                return data
            })
            const allPokemonDetails = await Promise.all(detailPokemon)
            setPokemon(allPokemonDetails)
        } catch (err) {
            console.error(err);
        }

    }
    const filteredPokemon = pokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()))
    // if no result found 
    const isNoResult = !loading && !error && search && filteredPokemon.length === 0;

    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <>
            <section className='container'>
                <header>
                    <h1>Let's Catch 'Em All</h1>
                </header>
                <div className='pokemon-search'>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search for a Pokemon' />
                </div>
                <div>
                    {loading && <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</h2>}
                    {error && <h2 style={{ textAlign: "center", marginTop: "2rem" }}>{error}</h2>}

                    {!loading && !error && (
                        <ul className='cards'>
                            {

                                filteredPokemon.map((pokemon) => {
                                    return (
                                        <PokemonCard pokemon={pokemon} key={pokemon.id} />
                                    )
                                })

                            }
                        </ul>
                    )}
                    {isNoResult && (
                        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
                            No Pokemon Found! 😔
                        </h2>
                    )}
                </div>
            </section >
        </>
    )
}

export default Pokemon