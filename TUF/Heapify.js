//Heapify Algorithm

class Solution {

    heapify(arr, index, value) {
        if (arr[index] > value) {
            arr[index] = value;
            this.heapUp(arr, index);
        } else {
            arr[index] = value;
            this.heapDown(arr, index);
        }
        return;
    }

    heapDown(arr, index) {
        let n = arr.length;

        let smallest_index = index;

        let left = 2 * index + 1;
        let right = 2 * index + 2;

        if (left < n && arr[left] < arr[smallest_index]) {
            smallest_index = left;
        }

        if (right < n && arr[right] < arr[smallest_index]) {
            smallest_index = right;
        }
        if (smallest_index !== index) {
            let temp = arr[index];
            arr[index] = arr[smallest_index];
            arr[smallest_index] = temp;
            this.heapDown(arr, smallest_index);
        }
        return
    }

    heapUp(arr, index) {
        let parent = Math.floor((index - 1) / 2);
        if (index > 0 && arr[index] < arr[parent]) {
            let temp = arr[index];
            arr[index] = arr[parent];
            arr[parent] = temp;
            this.heapUp(arr, parent);
        };

        return;
    }



}
//Test Case 
// ind = 5 val = 2;
let arr = [1, 4, 5, 5, 7, 6];
//res - 1,4,2,5,7,5

let res = new Solution();
res.heapify(arr, 5, 2);
console.log(arr);