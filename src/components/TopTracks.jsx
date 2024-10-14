import { useSpotifyProfileData } from "../contexts/SpotifyProfileProvider";
import './TopTracks.css'


export function TopTracks(){
    let {topTracks} = useSpotifyProfileData();

    if (topTracks.items && topTracks.items.length > 0) {
        return(
            <div id="topTracksContainer">
                {topTracks.items.map((track) => {
                    return <div className="trackCard" key={track.id}>
                        <h2>{track.name}</h2>
                        <img src={track.album.images[0].url} alt="" />
                    </div>
                })}
            </div>
        )
    } else {
        return (
            <div id="topTracksContainer">
                <p>Please login to see your top tracks.</p>
            </div>
        )
    }
}