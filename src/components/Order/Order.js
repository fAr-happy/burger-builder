import React from "react";
import styles from "./Order.module.css";

// class Order extends React.Component {
//   render() {
//     return (
//       <div className={styles.Order}>
//         <p className={styles.Ingredients}>
//           <span>Ingredints: </span>
//           {console.log(this.props.ingredinets)}
//           <span>salad ({this.props.salad})</span>
//           <span>meat ({this.props.meat})</span>
//           <span>cheese ({this.props.cheese})</span>
//           <span>bacon ({this.props.bacon})</span>
//         </p>
//         <p className={styles.Price}>
//           <span>price:</span>
//           <strong>{Number.parseFloat(this.props.price).toFixed(2)} $</strong>
//         </p>
//       </div>
//     );
//   }
// }

// export default Order;

class Order extends React.Component {
  render() {
    let orderIngredients = [];
    for (let i in this.props.ingredinets) {
      orderIngredients.push([i, this.props.ingredinets[i]]);
    }
    orderIngredients = orderIngredients.map(ing => (
      <span key={ing[0]}>{`${ing[0]} (${ing[1]})`}</span>
    ));

    return (
      <div className={styles.Order}>
        <p className={styles.Ingredients}>
          <span>Ingredints: </span>
          {orderIngredients}
        </p>
        <p className={styles.Price}>
          <span>price:</span>
          <strong>{Number.parseFloat(this.props.price).toFixed(2)} $</strong>
        </p>
      </div>
    );
  }
}

export default Order;
