import React, { useEffect, useState } from 'react'
import './SogList.css'
import axios from 'axios'


export default function SongList() {



    const client_id = "f87b8dbde16844349e31be3de4bf9601"; //both recived from spotify developer account
    const client_secret = "6fb6626ee4e844fc8f4cc9b71ea86a81";

    const playlist_id = "37i9dQZF1DZ06evO2pb4Ji"; //can Change the playlist ID as per requirement
    const playlist_url = `https://api.spotify.com/v1/playlists/${playlist_id}`;


    const [tracks, setTracks] = useState([]);

    localStorage.setItem("tracks", JSON.stringify(tracks)); //  storing the tracks in local storage to access them in another component or page

    const [trackid, setTrackid] = useState({}); 
    console.log('helooooooooo',trackid);

    useEffect(() => {


        // Function to get access token
        const getAccessToken = async () => {


            //api calling to get the access token
            try {
                const response = await axios.post(
                    'https://accounts.spotify.com/api/token',
                    new URLSearchParams({
                        grant_type: 'client_credentials',
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
                        }
                    }
                );

                const accessToken = response.data.access_token; //storing the access token in a variable
                console.log('Access Token:', accessToken);      //printing the access token

                fetchPlaylistTracks(accessToken); //calling functions to be executed after getting access token
                //passing access token as an argument
            } catch (error) {
                console.error('Error getting access token:', error);
            }
        };




        // Function to fetch playlist tracks
        const fetchPlaylistTracks = async (accessToken) => {


            //api calling to get the playlist tracks
            try {
                const response = await axios.get(playlist_url,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    }
                );

                const playlistTracks = response.data.tracks.items;  //storing the tracks in a variable
                console.log('Playlist Tracks:', playlistTracks);    //printing the tracks
                setTracks(playlistTracks);                          //storing the tracks in a state

                //                  OR
                // console.log(response.data.tracks.items);
                // setTracks(response.data.tracks.items);
                // console.log(tracks);   //printing user state

            } catch (error) {
                console.error('Error fetching playlist tracks:', error);
            }
        };



        getAccessToken();
    }, [client_id, client_secret]);






    return (
        <>
            <div class="container" id='containerlist'>

                <div class="row cant d-flex justify-content-center align-items-center" id='cant'>

                    <div class="col-md-6">

                        <div class="p-3 card" id='listcard'>



                            {tracks.map((item) => (

                                <div class="d-flex justify-content-between align-items-center p-3 music" onClick={()=>setTrackid(item.track.id)}>

                                    <div class="d-flex flex-row align-items-center">

                                        <i class="fa fa-music color"></i>

                                        <small class="ml-2">{item.track.name} - {item.track.artists[0].name} </small>

                                    </div>
                                    {/* <i class="fa fa-check color"></i> */}
                                </div>

                            ))}


                        </div>

                    </div>

                </div>


            </div>
        </>
    )
}
