import {Fragment, useContext} from 'react';
import CartItem from "./CartItem";
import {AppContext} from "../context/AppContext";

const YourOrder = ( { cart } ) => {

  const [cart1, setCart] = useContext(AppContext)
  let totalPrice1 = 0;
  if (cart1) {
    for (let data in cart1.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }
	return (
		<Fragment>
			{ cart ? (
				<Fragment>
					{/*Product Listing*/}
					<table className="checkout-cart table table-hover w-full mb-10">
						<thead>
						<tr className="woo-next-cart-head-container text-left">
							<th className="woo-next-cart-heading-el" scope="col"/>
							<th className="woo-next-cart-heading-el" scope="col">Product</th>
							<th className="woo-next-cart-heading-el" scope="col">Total</th>
						</tr>
						</thead>
						<tbody>
						{ cart.products.length && (
							cart.products.map( item => (
								<CartItem key={ item.productId } item={ item } />
							) )
						) }
						{/*Total*/}
						<tr className="bg-gray-200">
							<td className=""/>
							<td className="woo-next-checkout-total font-normal text-xl">Subtotal</td>
							<td className="woo-next-checkout-total font-bold text-xl">{totalPrice1} €</td>
						</tr>
						{/* <tr className="">
							<td className=""/>
							<td className="woo-next-checkout-total">Total</td>
							<td className="woo-next-checkout-total">{ cart.totalProductsPrice }</td>
						</tr> */}
						</tbody>
					</table>
				</Fragment>
			) : '' }
		</Fragment>
	)
};

export default YourOrder;
