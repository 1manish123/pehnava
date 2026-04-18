#include<iostream>
#include<vector>
#include <algorithm>
using namespace std;
int main(){ 
    // create vector, declare
    // vector<int>v;

    // initialize vector
    // vector<int>v1(5,1);
    // size and capacity;
    // cout<<"size of vector: "<<v.size()<<endl;
    // cout<<"capacity of vector: "<<v.capacity()<<endl;
    // v.push_back(1);
    // v.push_back(2);
    // v.push_back(3);
    // cout<<"size of vector: "<<v.size()<<endl;
    // cout<<"capacity of vector: "<<v.capacity()<<endl;



    // // updated value
    // v[1]=10;
    // cout<<endl;

    // cout<<"size of vector: "<<v1.size()<<endl;
    // cout<<"capacity of vector: "<<v1.capacity()<<endl;
    // v1.push_back(10);
    // cout<<"size of vector: "<<v1.size()<<endl;
    // cout<<"capacity of vector: "<<v1.capacity()<<endl;



    // vector<int>v3;
    // v3.push_back(1);
    // v3.push_back(2);        
    // v3.push_back(3);
    // v3.push_back(4); 
    // v3.push_back(5);
    // v3.pop_back();
//     v3.erase(v3.begin()+1);
//    cout<<"size of vector: "<<v3.size()<<endl;
//     cout<<"capacity of vector: "<<v3.capacity()<<endl;
    // for(int i=0;i<v3.size();i++){
    //     cout<<v3[i]<<" ";
    // }



// v3.insert(v3.begin()+1,10);
//     for(int i=0;i<v3.size();i++){
//         cout<<v3[i]<<" ";
//     }
//     v3[2]=20;
//     cout<<endl;
//     for(int i=0;i<v3.size();i++){
//         cout<<v3[i]<<" ";
//     }


// vector<int>arr;
// arr.push_back(1);
// arr.push_back(22);  
// arr.push_back(32);
// arr.push_back(41);   
// arr.push_back(51);  
// cout<<arr[0]<<endl;
// cout<<arr.front()<<endl;
// cout<<arr[arr.size()-1]<<endl;
// cout<<arr.back()<<endl;



// sort 

 vector<int> ans;

    ans.push_back(1);
    ans.push_back(21);
    ans.push_back(13);
    ans.push_back(42);
    ans.push_back(15);
// increasing order
    sort(ans.begin(), ans.end());
    for(int i = 0; i < ans.size(); i++) {
        cout << ans[i] << " ";
         
    }

    cout<<binary_search(ans.begin(), ans.end(), 113)<<endl;
    cout<<find(ans.begin(),ans.end(),42)-ans.begin()<<endl;

    // decreasing order
    // sort(ans.begin(), ans.end(), greater<int>());

    // for (int i = 0; i < ans.size(); i++) {
    //     cout << ans[i] << " ";
    // }

}