import express, {Request, Response, NextFunction} from 'express'; 
import bodyParser from 'body-parser'; 
import { filterImageFromURL, deleteLocalFiles } from './util/util'; 

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // GET /filteredimage?image_url={{URL}} 
  app.get("/filteredimage", async (req: Request, res: Response, next: NextFunction) => { 
    // get URL image 
    try { 
      let absolutePath: string = await filterImageFromURL(req.query.image_url) as string; 
      return res.status(200).sendFile(absolutePath, function (err) { 
        console.log("File downloaded "); 
        // delete file 
        if (!err) { 
          deleteLocalFiles([absolutePath]); 
          console.log("File deleted "); 
        } else {
          res.status(400).send("image not found");
        }
      }); 
    } catch (e) { 
      return next(e); 
    } 
  });

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
