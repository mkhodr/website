from .definitions import Arena
import time


def simulate(x=1000, y=500 ,particle_no=500, food_no=5000):
    start_time = time.time()
    arena = Arena(x=x, y=y ,particle_no=particle_no, food_no=food_no)
    ticks = [0]

    def next_tick():
        arena.move_particles(arena.closest_food_map)
        arena.check_collision()
        ticks[0] += 1
        return send_data()

    def send_data():
        ## Particles 
        particle_info = [(p.position.x, p.position.y, p.size, p.velocity, p.consumed, p.calories) for p in arena.particles]
        particle_positions_x, particle_positions_y, particle_size, particle_velocity, particle_consumed, particle_calories = zip(*particle_info)
        ## Foods
        food_info = [(f.position.x, f.position.y, f.nutrition) for f in arena.foods]
        if food_info:
            food_positions_x, food_positions_y, food_nutrition = zip(*food_info)
            return {'particles': {'x': list(particle_positions_x), 'y': list(particle_positions_y), 'r': list(particle_size), 'velocity': list(particle_velocity), 'consumed': list(particle_consumed), 'calories': list(particle_calories)},
                    'foods': {'x': list(food_positions_x), 'y': list(food_positions_y), 'r': list(food_nutrition)},
                    'tick': ticks,
                    }

        return {'particles': {'x': list(particle_positions_x), 'y': list(particle_positions_y), 'r': list(particle_size), 'velocity': list(particle_velocity), 'consumed': list(particle_consumed), 'calories': list(particle_calories)},
                'foods': {'x':[], 'y': [], 'r': []},
                'tick': ticks,
                }
    
    
    while arena.foods:
        yield next_tick()

    
    
    end_time = time.time()
    runtime = end_time - start_time

    return



