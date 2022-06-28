import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

async function addToCart(cartId, productId) {
  
  // fadeIn(addSpan)

  const res = await fetch(`/api/cart/${cartId}/products/${productId}`, { method: 'POST' })
  console.log("STATUS", res.status)
  console.log("Producto agregado con exito", res)
  if (res.status !== 201) {
    return "error"
  }

  // setTimeout(() => fadeOut(addSpan), 500);
    

    //await updateCartBadge()
}

const Item = ({ item }) => {

  
  
  return (
    <Card sx={{ maxWidth: 345 }}>
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
          {item.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={addToCart}>
          Add to Cart
        </Button>
        <Button size="small">
          <Link to={`/products/${item._id}`}>View</Link>
        </Button>
      </CardActions>
    </Card>
  );
};
export default Item;
