import math
from .quadtree import Point, Rectangle, Circle, QuadTreeNode
from random import randint, uniform, choices
import string
# import matplotlib.pyplot as plt

class Arena:
    def __init__(self, x=500, y=500, food_no=2000, particle_no=500):
        self.particles = []
        self.foods = []
        self.particle_no = particle_no
        self.food_no = food_no
        self.x = x
        self.y = y
        self.closest_food_map = dict()
        self.food_map = dict()
        self.quadtree = QuadTreeNode(Rectangle(0,0,x,y))

        for _ in range(particle_no):
            particle = self.spawn_random_particle()

        for _ in range(food_no):
            food = self.spawn_random_food()
            position = (food.position.x, food.position.y)
            self.food_map[position] = food

        
        self.update_closest_food()


    def add_particle(self, Particle):
        self.particles.append(Particle)

    def add_food(self, Food):
        self.foods.append(Food)
        self.quadtree.insert(Food)

    def random_position(self):
        random_position = Point(round(uniform(0, self.x-1), 4), round(uniform(0, self.y-1), 4))
        return random_position
    
    def check_collision(self):
                
        foods = set((food.position.x, food.position.y) for food in self.foods)
        particles = set((particle.position.x, particle.position.y) for particle in self.particles)
        collisions = foods & particles
        if collisions:
            for collision in collisions:
                collided_food = self.food_map.pop(collision)
                self.foods.remove(collided_food)
                self.quadtree.remove(collided_food)
                for particle in self.particles:
                    if particle.position.x == collision[0] and particle.position.y == collision[1]:
                        collided_particle = particle
                        collided_particle.check_collision(collided_food)
                        closest_food = collided_particle.closest_food(self.quadtree)
                        self.closest_food_map[collided_particle.name] = closest_food
            


    def move_particles(self, closest_foods_map):
        for particle in self.particles:
            closest_food = closest_foods_map.get(particle.name)
            if closest_food:
                teste = closest_food.position.x, closest_food.position.y
                if not self.food_map.get(teste):
                    closest_food = particle.closest_food(self.quadtree, radius=500)
                    self.closest_food_map[particle.name] = closest_food
            particle.move(closest_food)


    
    def update_closest_food(self):
        for particle in self.particles:
            closest_food = particle.closest_food(self.quadtree)
            self.closest_food_map[particle.name] = closest_food
        return self.closest_food_map

    def spawn_random_food(self):
        random_position = self.random_position()
        if not self.food_map.get(random_position):
            nutrition_value = randint(1,7)
            food = Food(nutrition_value, random_position)
            self.add_food(food)
        else:
            self.spawn_random_food()
        return food
    


    def spawn_random_particle(self):
        name = ''.join(choices(string.ascii_uppercase + string.digits, k=4))
        random_position = self.random_position()
        size = randint(1,5)
        hunger = 0
        particle = Particle(name, size, hunger, random_position)
        self.add_particle(particle)
        return particle






class Particle:
    def __init__(self, name, size, hunger, position=Point(0.,0.)):
        self.name = name
        self.size = size
        self.hunger = hunger
        self.velocity = (2-(size*0.25))
        self.position = position
        self.consumed = 0
        self.calories = 0
        

    def feed(self, closest_food):
        self.hunger += closest_food.nutrition
        self.calories += closest_food.nutrition
        self.consumed += 1
        if self.hunger >= self.size:
            self.size += 1
            self.velocity = (2-(self.size*0.25))
            self.hunger = 0
        return
    
    def closest_food(self, quadtree, radius=25):
        x,y = self.position.x, self.position.y
        range = Circle(x,y,radius)
        foods = quadtree.query(range)
        if not foods:
            range = Circle(x,y,radius+quadtree.bounds.width)
            foods = quadtree.query(range)
        if foods:
            closest_food = min(foods, key=lambda food: math.sqrt((food.position.x - x)**2 + (food.position.y - y)**2))
            return closest_food
        return

    def check_collision(self, closest_food):
        if closest_food:
                self.feed(closest_food)
                return True
        return False

    def move(self, closest_food):
        x,y = self.position.x , self.position.y
        velocity = self.velocity
        if closest_food:
            fx,fy = closest_food.position.x, closest_food.position.y   # food x and y
            dx = fx - x                     # distance in X axis
            dy = fy - y                     # distance in Y axis
            if dx == 0 and dy == 0:         # particle in the same point as the food
                return
                # if self.check_collision(closest_food):
                #     foods.remove(closest_food)
            angle = math.atan2(dy,dx)       # in radians
            if angle < 0:                   # converting negative angles to positive
                angle += math.pi * 2
            vx = math.cos(angle)*velocity   # Calculating the X component of the speed
            vy = math.sin(angle)*velocity   # Calculating the Y component of the speed
            if abs(dx) < abs(vx):           # Reducing the X speed to the distance if the particle is close enough
                vx = dx
            if abs(dy) < abs(vy):           # Reducing the X speed to the distance if the particle is close enough
                vy = dy
            new_x = x + vx
            new_y = y + vy
            new_position = Point(new_x, new_y)
            self.position = new_position
            return
        return
        

class Food:
    def __init__(self, nutrition, position=Point(0.,0.)):
        self.nutrition = nutrition
        self.position = position

# def visualize_quadtree(node, ax):
#     width = node.bounds.width
#     height = node.bounds.height
#     x = node.bounds.x
#     y = node.bounds.y
#     ax.add_patch(plt.Rectangle((x, y), width, height, fill=False, color='black'))
#     ax.text(x + width / 2, y + height / 2, str(len(node.objects)), ha='center', va='center', color='red')

#     for child in node.children:
#         visualize_quadtree(child, ax)
