import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";

const ItemDetail = ({ item }) => {

  return (

      <Card sx={{ maxWidth: 345 }} >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={item.thumbnail}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link to="/cart">Add to Cart</Link>
          </Button>
        </CardActions>
        <ItemCount item={item} />
      </Card>
  );
};
export default ItemDetail;
