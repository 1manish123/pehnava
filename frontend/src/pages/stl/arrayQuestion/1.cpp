#include<iostream>
#include<vector>
using namespace std;





vector <int> reverse(vector<int>v,int m){
    int s=0;
    int e=m-1;
    while(s<=e){
        swap(v[s],v[e]);
        s++;
        e--;
    }
    return v;
}
int main(){
    int m=3;
    vector<int>v;
    v.push_back(11);
    v.push_back(32);
    v.push_back(31);         
    v.push_back(14);
    v.push_back(52);
    vector<int>ans=reverse(v ,m);
    for(int i=0;i<ans.size();i++){
        cout<<ans[i]<<" ";
    }
return 0;
}