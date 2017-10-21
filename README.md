# CG 2017/2018

## Next group meeting: 06/10/2017

@António Sarmento  
* [ ] **Collisions**: Implement bare minimum of collisions system.
+ [ ] **Collisions**: Apply collision effects to Butter, Orange, Torus and Car.

@Francisco Barros  

@Rafael Ribeiro  
* [ ] **Track**: Apply `Tire extends RigidBody`.
* [ ] **Track**: By doing `obj.add(this.mesh)`, you're completely ignoring the Class object construction, making this as useful as just another method. After extending Tire from a RigidBody, remove `this.mesh.add(mesh)` and use `obj.add(this)`.
* [ ] **Track**: You also did this in Track, but that's less relevant so do whatever you wish.
