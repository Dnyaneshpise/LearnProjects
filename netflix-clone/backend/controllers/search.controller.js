import { fetchFromTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

export async function searchPerson(req,res){
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return res.status(404).json({success:false,message:"No person found with this name"});
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"person",
                    createsAt:new Date(),
        }
    }});

        res.status(200).json({success:true,content:response.results});
    } catch (error) {
        console.error(error,"error in search controller");
        res.send(500).json({success:false,message:"Internal Server Error in search controller"});
    }
}

export async function searchMovie(req,res){
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if(response.results.length===0){
            return res.status(404).json({success:false,message:"No movie found with this name"});
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"movie",
                    createsAt:new Date(),
        }
    }});

        res.status(200).json({success:true,content:response.results});

    } catch (error) {
        console.error(error,"error in search movie controller",error.message);
        res.send(500).json({success:false,message:"Internal Server Error in search controller"});
    }
}
export async function searchTv(req,res){
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if(response.results.length===0){
            return res.status(404).json({success:false,message:"No tv found with this name"});
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"tv",
                    createsAt:new Date(),
        }
    }});

        res.status(200).json({success:true,content:response.results});

    } catch (error) {
        console.error(error,"error in search tv controller",error.message);
        res.send(500).json({success:false,message:"Internal Server Error in search controller"});
    }
}

export async function getSearchHistory(req,res){
    try {
        res.status(200).json({success:true,content:req.user.searchHistory});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error in getSearchHistory"});
    }
}

export async function removeItemFromSearchHistory(req,res){
    let   { id } = req.params; //string type
    id = parseInt(id); //convert to number
    try {
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{
                    id:id
                }
            }
        });
        res.status(200).json({success:true,message:"Item removed from search history"});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error in removeItemFromSearchHistory"});
    }
}