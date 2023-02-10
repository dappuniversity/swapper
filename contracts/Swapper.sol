// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Uniswap V3 Documentation
// --> https://docs.uniswap.org/contracts/v3/guides/swaps/single-swaps

contract Swapper {
    address public owner;
    address public immutable SWAP_ROUTER;

    constructor(address _SWAP_ROUTER) {
        SWAP_ROUTER = _SWAP_ROUTER;
        owner = msg.sender;
    }

    function swap(
        address[] memory _path,
        uint24 _fee,
        uint256 _amountIn
    ) public {
        require(
            IERC20(_path[0]).transferFrom(msg.sender, address(this), _amountIn),
            "Transfer Failed"
        );

        require(
            IERC20(_path[0]).approve(SWAP_ROUTER, _amountIn),
            "Approval Failed"
        );

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: _path[0],
                tokenOut: _path[1],
                fee: _fee,
                recipient: address(this), // <-- You can optionally use msg.sender as well
                deadline: block.timestamp,
                amountIn: _amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        uint256 amountOut = ISwapRouter(SWAP_ROUTER).exactInputSingle(params);
        IERC20(_path[1]).transfer(msg.sender, amountOut);
    }

    function withdrawETH() public {
        require(msg.sender == owner);
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

    function withdrawTokens(address _token) public {
        require(msg.sender == owner);
        require(
            IERC20(_token).transfer(
                owner,
                IERC20(_token).balanceOf(address(this))
            )
        );
    }
}
